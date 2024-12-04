let latitude, longitude,staffId;

$(document).ready(function () {
    getAllFields();
    loadLogs();
    getAllStaffIds();
    let map = L.map('map').setView([7.8731, 80.7718], 7); // Set initial map location (Sri Lanka)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    let marker;

    map.on('click', function (e) {
        const latlng = e.latlng;
        latitude = latlng.lat.toFixed(6); // Store latitude (6 decimal places)
        longitude = latlng.lng.toFixed(6); // Store longitude (6 decimal places)

        $('#location').val(`${latitude}, ${longitude}`); // Update the location input

        // If a marker already exists, remove it
        if (marker) {
            map.removeLayer(marker);
        }

        marker = L.marker([latitude, longitude]).addTo(map);
    });
});

document.getElementById('toggleSidebar').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('collapsed');
});

function loadLogs() {
    let token = localStorage.getItem("token");
    if (!token) {
        alert("Authorization token is missing. Please log in.");
        return;
    }

    $.ajax({
        method: "GET",
        url: "http://localhost:8081/api/v1/Monitor/ids",
        headers: {
            "Authorization": "Bearer " + token
        },
        success: function(data) {
            let logSelect = $("#LogId");
            logSelect.empty();
            logSelect.append('<option value="" disabled selected>Select Log ID</option>');

            if (Array.isArray(data) && data.length > 0) {
                data.forEach(function(logId) {
                    logSelect.append('<option value="' + logId + '">' + logId + '</option>');
                });
            } else {
                console.warn("No logs available or incorrect data format");
                logSelect.append('<option value="" disabled>No Logs Available</option>');
            }
        },
        error: function(xhr, status, error) {
            console.error("Error loading logs:", error);
            alert("An error occurred while loading log data. Please try again.");
        }
    });
}
function getAllStaffIds() {
    let token = localStorage.getItem("token");  // Retrieve the token from local storage
    if (!token) {
        alert("Authorization token is missing. Please log in.");
        return;
    }

    $.ajax({
        method: "GET",
        url: "http://localhost:8081/api/v1/Staff/ids", // Your API to fetch all staff data
        headers: {
            "Authorization": "Bearer " + token
        },
        success: function (data) {
            console.log('API Response:', data);

            let staffSelect = $("#StaffId");
            staffSelect.empty();  // Clear the existing options
            staffSelect.append('<option value="" disabled selected>Select Staff ID</option>');

            if (Array.isArray(data) && data.length > 0) {
                // Assuming data is an array of objects and each object contains the 'StaffId' field
                data.forEach(function(staffId) {
                    staffSelect.append('<option value="' + staffId + '">' + staffId + '</option>');
                });
            } else {
                console.warn("No staff IDs available or the data format is incorrect.");
                staffSelect.append('<option value="" disabled>No Staff Available</option>');
            }
        },
        error: function (xhr, status, error) {
            console.error("Error fetching staff:", error);
            alert("An error occurred while fetching staff. Please try again.");
        }
    });
}

function addFields() {
    let token = localStorage.getItem("token");

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
    let StaffId = $("#StaffId").val();
    let logId = $("#LogId").val();



    let formData = new FormData();
    formData.append("fieldCode", fieldId);
    formData.append("fieldName", fieldName);
    formData.append("fieldLocation[x]", latitudeFloat);
    formData.append("fieldLocation[y]", longitudeFloat);
    formData.append("extent_size", extentSize);
    formData.append("Field_Staff", StaffId);
    formData.append("logId", logId);

    // Append images if selected
    if (fieldImage1) {
        formData.append("fieldImageOne", fieldImage1);
    }
    if (fieldImage2) {
        formData.append("fieldImageTwo", fieldImage2);
    }

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
            getAllFields()
            console.log("Field added successfully");
            alert("Field added successfully!");
        },
        error: function (xhr, status, error) {
            console.error("Error adding field:", error);
            alert("An error occurred while adding the field. Please try again.");
        }
    });
}

function getAllFields() {
    let token = localStorage.getItem("token");

    if (!token) {
        alert("Authorization token is missing. Please log in.");
        return;
    }

    $.ajax({
        method: "GET",
        url: "http://localhost:8081/api/v1/field",
        headers: {
            "Authorization": "Bearer " + token
        },
        success: function (data) {
            console.log('API Response:', data);

            if (Array.isArray(data) && data.length > 0) {
                // Clear the table before appending new rows
                $("table tbody").empty();

                data.forEach(function (field) {
                    let staffList = field.staff.map(staff => staff.id).join(", ");
                    let fieldCode = field.fieldId || field.fieldCode;
                    let fieldName = field.fieldName;
                    let location = field.fieldLocation ? `${field.fieldLocation.x}, ${field.fieldLocation.y}` : 'Unknown';
                    let extentSize = field.extentSize || field.extent_size;
                    let logId = field.logId || field.logCode;
                    staffId=staffList

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
                        <td>${staffList}</td>

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

                $(".edit-btn").on("click", function() {
                    let field = $(this).data("field");
                    // Populate the modal fields with the selected log's data
                    $("#updateFieldId").val(field.fieldCode);
                    $("#updateFieldName").val(field.fieldName);
                    $("#updateExtentSize").val(field.extentSize);

                });

                $(".delete-btn").on("click", function() {
                    let fieldCode = $(this).data("id");
                    if (confirm("Are you sure you want to delete this log?")) {
                        deleteLog(fieldCode);
                    }
                });

            } else {
                console.log("No logs found.");
                $("table tbody").html("<tr><td colspan='7'>No fields available.</td></tr>");
            }
        },
        error: function(xhr, status, error) {
            console.error("Error fetching field:", error);
            alert("An error occurred while fetching fields. Please try again.");
        }
    });
}function deleteLog(fieldId) {
    let token = localStorage.getItem("token");

    $.ajax({
        method: "DELETE",
        url: "http://localhost:8081/api/v1/field/" + fieldId, // Correct URL format
        headers: {
            "Authorization": "Bearer " + token
        },
        success: function(data) {
            console.log("Log deleted successfully");
            getAllFields(); // Refresh the table after deletion
        },
        error: function(xhr, status, error) {
            console.error("Error deleting log:", error);
            alert("An error occurred while deleting the log. Please try again.");
        }
    });
}

let updateMap, updateMarker, updateLatitude, updateLongitude;

function initUpdateMap(lat = 7.8731, lon = 80.7718) { // Default to Sri Lanka
    // Initialize the map for the Update modal
    updateMap = L.map('updateMap').setView([lat, lon], 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(updateMap);

    updateMarker = L.marker([lat, lon]).addTo(updateMap);

    updateMap.on('click', function (e) {
        const latlng = e.latlng;
        updateLatitude = latlng.lat.toFixed(6);
        updateLongitude = latlng.lng.toFixed(6);

        // Update marker position
        updateMarker.setLatLng(latlng);

        // Update the location input fields in the form
        $('#updateFieldLocation').val(`${updateLatitude}, ${updateLongitude}`);
    });
}

$('#updateFieldModal').on('show.bs.modal', function (e) {
    let field = $(e.relatedTarget).data('field'); // Get data from the clicked button
    let currentLat = field.fieldLocation?.x || 7.8731; // Default to Sri Lanka if no location is set
    let currentLon = field.fieldLocation?.y || 80.7718;

    initUpdateMap(currentLat, currentLon);

    $('#updateFieldId').val(field.fieldId);
    $('#updateFieldName').val(field.fieldName);
    $('#updateExtentSize').val(field.extentSize);
    $('#updateFieldLocation').val(`${currentLat}, ${currentLon}`); // Pre-fill with current location
});
function updateField() {
    let token = localStorage.getItem("token");
    console.log("Token: ", token);  // Debugging the token
    if (!token) {
        alert("You are not authorized. Please log in.");
        return;
    }

    // Get the updated values from the form
    let FieldCode = $("#updateFieldId").val();
    let FieldName = $("#updateFieldName").val();
    let ExtentSize = $("#updateExtentSize").val();
    let StaffId = $("#StaffId").val();


    // Use the updated latitude and longitude (from the form or variables)
    let updatedLatitude = updateLatitude || $('#updateFieldLocation').val().split(',')[0];
    let updatedLongitude = updateLongitude || $('#updateFieldLocation').val().split(',')[1];
    const latitudeFloat = parseInt(updatedLatitude);
    const longitudeFloat = parseInt(updatedLongitude);
    // Validate the coordinates
    if (!updatedLatitude || !updatedLongitude) {
        alert("Invalid field location coordinates.");
        return;
    }

    let formData = new FormData();
    formData.append("fieldCode", FieldCode);
    formData.append("fieldName", FieldName);
    formData.append("fieldLocation[x]", latitudeFloat);
    formData.append("fieldLocation[y]", longitudeFloat);
    formData.append("extent_size", ExtentSize);
    formData.append("Field_Staff", staffId);

    let fieldImage1 = $("#updateFieldImage1")[0].files[0];
    let fieldImage2 = $("#updateFieldImage2")[0].files[0];

    if (fieldImage1) {
        formData.append("fieldImageOne", fieldImage1);
    }
    if (fieldImage2) {
        formData.append("fieldImageTwo", fieldImage2);
    }

    $.ajax({
        method: "PUT",
        url: "http://localhost:8081/api/v1/field/" + FieldCode,
        headers: {
            "Authorization": "Bearer " + token
        },
        contentType: false,
        processData: false,
        data: formData,
        success: function (data) {
            console.log("Field updated successfully");
            getAllFields(); // Refresh the list after update
            $('#updateFieldModal').modal('hide'); // Close the modal
        },
        error: function (xhr, status, error) {
            console.error("Error updating field:", error);
            alert("An error occurred while updating the field. Please try again.");
        }
    });
}

