let fieldIds, staffIds;
// Sidebar toggle
document.getElementById('toggleSidebar').addEventListener('click', function() {
    document.getElementById('sidebar').classList.toggle('collapsed');
});

$(document).ready(function() {

    getAllStaffIds()
    getAllEquipment()
    loadFields()

});

function loadFields() {
    let token = localStorage.getItem("token");  // Retrieve the token from local storage
    if (!token) {
        alert("Authorization token is missing. Please log in.");
        return;
    }
    $.ajax({
        method: "GET",
        url: "http://localhost:8081/api/v1/field/ids",
        headers: {
            "Authorization": "Bearer " + token  // Include the token in the header
        },
        success: function(data) {
            let fieldSelect = $("#FieldId");
            fieldSelect.empty();  // Clear the existing options
            fieldSelect.append('<option value="" disabled selected>Select Field ID</option>');

            if (Array.isArray(data) && data.length > 0) {
                data.forEach(function(fieldId) {
                    fieldSelect.append('<option value="' + fieldId + '">' + fieldId + '</option>');
                });
            } else {
                console.warn("No field IDs available or the data format is incorrect.");
                fieldSelect.append('<option value="" disabled>No Fields Available</option>');
            }
        },
        error: function(xhr, status, error) {
            console.error("Error loading fields:", error);
            alert("An error occurred while loading field data. Please try again.");
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

function addEquipment(){
    let token = localStorage.getItem("token");
    if (!token) {
        alert("Authorization token is missing. Please log in.");
        return;
    }

    let EquipmentId = $("#EquipmentId").val().trim();
    let EquipmentName = $("#EquipmentName").val().trim();
    let EquipmentStatus = $("#EquipmentStatus").val().trim();
    let EquipmentType = $("#EquipmentType").val().trim();
    let FieldId = $("#FieldId").val();
    let StaffId = $("#StaffId").val(); // Corrected ID



    // Additional Validation (e.g., EquipmentId format)
    if (!/^\d+$/.test(EquipmentId)) {
        alert("Equipment ID must be a numeric value.");
        return;
    }

    $.ajax({
        method: "POST",
        contentType: "application/json",
        url: "http://localhost:8081/api/v1/Equipment/saveEquipment", // Corrected URL
        headers: {
            "Authorization": "Bearer " + token
        },
        async: true,
        data: JSON.stringify({
            "id": EquipmentId,
            "name": EquipmentName,
            "status": EquipmentStatus,       // Corrected
            "type": EquipmentType,           // Corrected
            "assignedStaff": StaffId,        // Corrected
            "assignedField": FieldId         // Corrected
        }),
        success: function(data) {
            console.log("Equipment added successfully", data);
            if (data.code === 201) {
                alert("Equipment saved successfully.");
                getAllEquipment();
                $("#addEquipmentForm")[0].reset(); // Reset form fields if applicable
            } else {
                alert("Error: " + data.message);
            }
        },
        error: function(xhr, status, error) {
            console.log("Error adding Equipment:", error);
            // Extract meaningful error message if available
            let errorMessage = xhr.responseJSON && xhr.responseJSON.message ? xhr.responseJSON.message : "An error occurred while adding equipment.";
            alert(errorMessage);
        }
    });
}


function getAllEquipment() {
    let token = localStorage.getItem("token");

    $.ajax({
        method: "GET",
        url: "http://localhost:8081/api/v1/Equipment/get_All_Equipment", // Corrected API endpoint
        headers: {
            "Authorization": "Bearer " + token
        },
        success: function(data) {
            console.log('API Response:', data);

            if (Array.isArray(data.data) && data.data.length > 0) { // Adjusted to data.data assuming StandardResponse wraps the data
                $("table tbody").empty();  // Clear existing table rows

                data.data.forEach(function(equipment) {
                    console.log(equipment);

                    let row = `<tr>
                        <td>${equipment.id}</td> 
                        <td>${equipment.name}</td>
                        <td>${equipment.status}</td>
                        <td>${equipment.type}</td>
                        <td>${equipment.assignedField}</td>
                        <td>${equipment.assignedStaff}</td>
                        <td>
                            <div class="action-btns">
                                <button class="btn btn-outline-primary btn-sm edit-btn" data-id="${equipment.id}" data-bs-toggle="modal" data-bs-target="#updateEquipmentModal">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-outline-danger btn-sm delete-btn" data-id="${equipment.id}">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>`;

                    $("table tbody").append(row);
                });

                $(".edit-btn").on("click", function() {
                    let equipmentId = $(this).data("id");
                    console.log(equipmentId)
                    $.ajax({
                        method: "GET",
                        url: "http://localhost:8081/api/v1/Equipment/Search_Equipment_By_Id/" + equipmentId,
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        },
                        success: function(response) {
                            if(response.code === 200) {
                                let equipment = response.data;
                                fieldIds = equipment.assignedField;
                                staffIds = equipment.assignedStaff;

                                $("#UpdateEquipmentId").val(equipment.id);
                                $("#UpdateEquipmentName").val(equipment.name);
                                $("#UpdateEquipmentStatus").val(equipment.status);
                                $("#UpdateEquipmentType").val(equipment.type);
                                $("#FieldId").val(equipment.assignedField);
                                $("#StaffId").val(equipment.assignedStaff);
                            } else {
                                alert("Error: " + response.message);
                            }
                        },
                        error: function(xhr, status, error) {
                            console.error("Error fetching equipment details:", error);
                            alert("An error occurred while fetching the equipment details. Please try again.");
                        }
                    });
                });

                // Handle delete button click
                $(".delete-btn").on("click", function() {
                    let equipmentId = $(this).closest("tr").find("td:first").text();
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


function updateEquipment(equipmentId) {
    let token = localStorage.getItem("token");
    if (!token) {
        alert("Authorization token is missing. Please log in.");
        return;
    }

    let EquipmentId = $("#UpdateEquipmentId").val();
    let EquipmentName = $("#UpdateEquipmentName").val().trim();
    let Status = $("#UpdateEquipmentStatus").val().trim();
    let Type = $("#UpdateEquipmentType").val().trim();
    let FieldId = $("#FieldId").val();
    let StaffId = $("#StaffId").val();

    console.log(EquipmentId, EquipmentName, Status, Type, FieldId, StaffId);

    if (!EquipmentId) {
        alert("Equipment ID is missing.");
        return;
    }

    let EquipmentData = {
        "id": EquipmentId, // Added ID
        "name": EquipmentName,
        "status": Status,
        "type": Type,
        "assignedField": FieldId,
        "assignedStaff": StaffId,
    };

    $.ajax({
        method: "PUT",
        contentType: "application/json",
        url: "http://localhost:8081/api/v1/Equipment/updateEquipment",
        headers: {
            "Authorization": "Bearer " + token
        },
        data: JSON.stringify(EquipmentData),
        success: function(response) {
            console.log("Equipment updated successfully", response);
            if (response.code === 201) {
                alert("Equipment updated successfully.");
                getAllEquipment(); // Corrected function call
                $("#updateEquipmentForm")[0].reset(); // Reset form fields if applicable
            } else {
                alert("Error: " + response.message);
            }
        },
        error: function(xhr, status, error) {
            console.log("Error updating Equipment:", error);
            let errorMessage = xhr.responseJSON && xhr.responseJSON.message ? xhr.responseJSON.message : "An error occurred while updating Equipment.";
            alert(errorMessage);
        }
    });
}

function deleteEquipment(equipmentId) {
    if (!confirm("Are you sure you want to delete this equipment?")) {
        return; // User canceled the deletion
    }

    let token = localStorage.getItem("token");
    if (!token) {
        alert("Authorization token is missing. Please log in.");
        return;
    }

    $.ajax({
        method: "DELETE",
        url: `http://localhost:8081/api/v1/Equipment/deleteEquipment/${equipmentId}`,
        headers: {
            "Authorization": "Bearer " + token
        },
        success: function(data) {
            console.log("Equipment deleted successfully", data);
            if (data.code === 200) {
                alert("Equipment deleted successfully.");
                // Optionally, remove the deleted equipment row from the table
                $(`button.delete-btn[data-id='${equipmentId}']`).closest('tr').remove();
            } else if (data.code === 404) {
                alert("Error: " + data.message);
            } else {
                alert("Error: " + data.message);
            }
        },
        error: function(xhr, status, error) {
            console.log("Error deleting Equipment:", error);
            let errorMessage = xhr.responseJSON && xhr.responseJSON.message ? xhr.responseJSON.message : "An error occurred while deleting equipment.";
            alert(errorMessage);
        }
    });
}

