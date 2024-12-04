// Sidebar toggle
document.getElementById('toggleSidebar').addEventListener('click', function() {
    document.getElementById('sidebar').classList.toggle('collapsed');
});

$(document).ready(function() {

    getAllStaffIds();


});
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
                data.forEach(function(staff) {
                    const staffId = staff.StaffId || staff.StaffCode; // Adjust if needed to the correct field
                    if (staffId) {
                        staffSelect.append('<option value="' + staffId + '">' + staffId + '</option>');
                    }
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
function getAllEquipment() {
    let token = localStorage.getItem("token");

    $.ajax({
        method: "GET",
        url: "http://localhost:8081/api/v1/Equipment", // API endpoint to fetch equipment data
        headers: {
            "Authorization": "Bearer " + token
        },
        success: function(data) {
            console.log('API Response:', data);

            if (Array.isArray(data) && data.length > 0) {
                $("table tbody").empty();  // Clear existing table rows

                data.forEach(function(equipment) {
                    console.log(equipment);

                    let row = `<tr>
                        <td>${equipment.EquipmentId}</td> 
                        <td>${equipment.EquipmentName}</td>
                        <td>${equipment.EquipmentStatus}</td>
                        <td>${equipment.EquipmentType}</td>
                        <td>${equipment.FieldId}</td>
                        <td>${equipment.StaffId}</td>
                        <td>
                            <div class="action-btns">
                                <button class="btn btn-outline-primary btn-sm edit-btn" data-id="${equipment.EquipmentId}" data-bs-toggle="modal" data-bs-target="#updateEquipmentModal">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-outline-danger btn-sm delete-btn" data-id="${equipment.EquipmentId}">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>`;

                    $("table tbody").append(row);
                });

                // Handle edit button click
                $(".edit-btn").on("click", function() {
                    let equipmentId = $(this).data("id");
                    updateEquipment(equipmentId);
                });

                // Handle delete button click
                $(".delete-btn").on("click", function() {
                    let equipmentId = $(this).data("id");
                    if (confirm("Are you sure you want to delete this equipment?")) {
                        deleteEquipment(equipmentId);
                    }
                });
            } else {
                console.log("No equipment found.");
                $("table tbody").html("<tr><td colspan='7'>No equipment available.</td></tr>");
            }
        },
        error: function(xhr, status, error) {
            console.error("Error fetching equipment:", error);
            alert("An error occurred while fetching equipment. Please try again.");
        }
    });
}

// Dummy functions for update and delete (you can implement the actual logic later)
function updateEquipment(equipmentId) {
    console.log('Edit equipment with ID:', equipmentId);
    // You can add the logic to fetch equipment details and populate the update form
}

function deleteEquipment(equipmentId) {
    console.log('Delete equipment with ID:', equipmentId);
    // Implement the delete logic here (e.g., making a DELETE request to the API)
}
