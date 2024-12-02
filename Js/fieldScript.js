let latitude, longitude;

$(document).ready(function () {
    getAllFields();
    // Initialize map with initial view (Sri Lanka)
    let map = L.map('map').setView([7.8731, 80.7718], 7); // Set initial map location (Sri Lanka)

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Marker for the selected location
    let marker;

    // Event listener for map clicks
    map.on('click', function (e) {
        const latlng = e.latlng;
        latitude = latlng.lat.toFixed(6); // Store latitude (6 decimal places)
        longitude = latlng.lng.toFixed(6); // Store longitude (6 decimal places)

        // Update the input field with the selected coordinates (e.g., combining lat, long)
        $('#location').val(`${latitude}, ${longitude}`); // Update the location input

        // If a marker already exists, remove it
        if (marker) {
            map.removeLayer(marker);
        }

        // Add a new marker at the clicked location
        marker = L.marker([latitude, longitude]).addTo(map);
    });
});

document.getElementById('toggleSidebar').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('collapsed');
});

// Inside Js/fieldScript.js
function addFields() {
    let token = localStorage.getItem("token");

    // Check if token exists
    if (!token) {
        alert("Authorization token is missing. Please log in.");
        return;
    }

    // Check if latitude and longitude are selected
    if (!latitude || !longitude) {
        alert("Please select a valid location on the map.");
        return;
    }

    const latitudeFloat = parseInt(latitude);
    const longitudeFloat = parseInt(longitude);

    let fieldId = $("#fieldId").val();
    let fieldName = $("#fieldName").val();
    let extentSize = $("#extentSize").val();
    let fieldImage1 = $("#fieldImage1")[0].files[0];
    let fieldImage2 = $("#fieldImage2")[0].files[0];
    let logId = $("#LogId").val();

    // Check for required fields
    if (!fieldId || !fieldName || !extentSize || !logId) {
        alert("Please fill in all required fields.");
        return;
    }

    let formData = new FormData();
    formData.append("fieldCode", fieldId);
    formData.append("fieldName", fieldName);
    formData.append("fieldLocation[x]", latitudeFloat);
    formData.append("fieldLocation[y]", longitudeFloat);
    formData.append("extent_size", extentSize);
    formData.append("logId", logId);

    // Append images if selected
    if (fieldImage1) {
        formData.append("fieldImageOne", fieldImage1);
    }
    if (fieldImage2) {
        formData.append("fieldImageTwo", fieldImage2);
    }

    // Send the form data via AJAX
    $.ajax({
        method: "POST",
        url: "http://localhost:8081/api/v1/field", // Correct URL
        headers: {
            "Authorization": "Bearer " + token
        },
        contentType: false,
        processData: false,
        data: formData,
        success: function (data) {
            console.log("Field added successfully");
            alert("Field added successfully!");
            // Optionally, refresh the page or update the table here
            // location.reload(); // Uncomment if you want to reload the page
        },
        error: function (xhr, status, error) {
            console.error("Error adding field:", error);
            alert("An error occurred while adding the field. Please try again.");
        }
    });
}

function getAllFields() {
    let token = localStorage.getItem("token");

    // Ensure token is available
    if (!token) {
        alert("Authorization token is missing. Please log in.");
        return;
    }

    $.ajax({
        method: "GET",
        url: "http://localhost:8081/api/v1/field", // API URL for fetching all fields
        headers: {
            "Authorization": "Bearer " + token
        },
        success: function (data) {
            console.log('API Response:', data); // Log the response for debugging

            if (Array.isArray(data) && data.length > 0) {
                // Clear the table before appending new rows
                $("table tbody").empty();

                data.forEach(function (field) {
                    let fieldCode = field.fieldId || field.fieldCode;
                    let fieldName = field.fieldName;
                    let location = field.fieldLocation ? `${field.fieldLocation.x}, ${field.fieldLocation.y}` : 'Unknown';
                    let extentSize = field.extentSize || field.extent_size;
                    let logId = field.logId || field.logCode;

                    // Handle base64 image strings correctly
                    let image1Src = field.fieldImage1 || '';
                    let image2Src = field.fieldImage2 || '';

                    let row = `<tr>
                        <td>${fieldCode}</td>
                        <td>${fieldName}</td>
                        <td>${location}</td>
                        <td>${extentSize}</td>
                        <td><img src="data:image/jpeg;base64,${image1Src}" class="img-fluid img-thumbnail" style="width: 30px; height: 30px; border-radius: 30px; margin-right: 50%;"/></td>
                        <td><img src="data:image/jpeg;base64,${image2Src}" class="img-fluid img-thumbnail" style="width: 30px; height: 30px; border-radius: 30px; margin-right: 50%;"/></td>
                        <td>${logId}</td>
                        <td>
                        <div class="action-btns">
                            <button class="btn btn-outline-primary btn-sm edit-btn fas fa-edit" data-id="${fieldCode}" data-field='${JSON.stringify(field)}' data-bs-toggle="modal" data-bs-target="#updateFieldModal">
                           
                            </button>
                            <button class="btn btn-outline-danger btn-sm delete-btn fas fa-trash" data-id="${fieldCode}">
                           
                            </button>
                            </div>
                        </td>
                    </tr>`;

                    $("table tbody").append(row);
                });

            } else {
                $("table tbody").html("<tr><td colspan='8' class='text-center'>No fields available</td></tr>");
            }
        },
        error: function (xhr, status, error) {
            console.error('Error retrieving fields:', error);
            alert("Error retrieving fields. Please try again.");
        }
    });

}


