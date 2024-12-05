let staffIds;

document.getElementById('toggleSidebar').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('collapsed');
});

$(document).ready(function () {
    getAllStaffIds();
    getAllVehicles();


    $(document).on("click", ".edit-btn", function () {
        let vehicleId = $(this).data("id");
        console.log("Editing vehicle ID:", vehicleId);
        fetchVehicleDetails(vehicleId);
    });


    $(document).on("click", ".delete-btn", function () {
        let vehicleId = $(this).data("id");
        console.log("Deleting vehicle ID:", vehicleId);
        if (confirm("Are you sure you want to delete this vehicle?")) {
            deleteVehicle(vehicleId);
        }
    });
});

function getAllStaffIds() {
    let token = localStorage.getItem("token");
    if (!token) {
        alert("Authorization token is missing. Please log in.");
        return;
    }

    $.ajax({
        method: "GET", url: "http://localhost:8081/api/v1/Staff/ids", headers: {
            "Authorization": "Bearer " + token
        }, success: function (data) {
            console.log('API Response:', data);

            let staffSelect = $("#DisplayStaffId");
            staffSelect.empty();
            staffSelect.append('<option value="" disabled selected>Select Staff ID</option>');

            if (Array.isArray(data) && data.length > 0) {

                data.forEach(function (staffId) {
                    staffSelect.append('<option value="' + staffId + '">' + staffId + '</option>');
                });
            } else {
                console.warn("No staff IDs available or the data format is incorrect.");
                staffSelect.append('<option value="" disabled>No Staff Available</option>');
            }
        }, error: function (xhr, status, error) {
            console.error("Error fetching staff:", error);
            alert("An error occurred while fetching staff. Please try again.");
        }
    });
}

function addVehicle() {
    let token = localStorage.getItem("token");
    if (!token) {
        alert("Authorization token is missing. Please log in.");
        return;
    }
    let VehicleId = $("#VehicleId").val().trim();
    let VehicleCategory = $("#VehicleCategory").val().trim();
    let FuelType = $("#FuelType").val().trim();
    let LicensePlateNumber = $("#LicensePlateNumber").val().trim();
    let VehicleRemarks = $("#VehicleRemarks").val().trim();
    let VehicleStatus = $("#VehicleStatus").val().trim();
    let StaffId = $("#StaffId").val();

    if (!/^\d+$/.test(VehicleId)) {
        alert("Vehicle ID must be a numeric value.");
        return;
    }
    $.ajax({
        method: "POST",
        contentType: "application/json",
        url: "http://localhost:8081/api/v1/Vehicle/saveVehicle",
        headers: {
            "Authorization": "Bearer " + token
        },
        data: JSON.stringify({
            "id": VehicleId,
            "category": VehicleCategory,
            "fuelType": FuelType,
            "licensePlateNumber": LicensePlateNumber,
            "remarks": VehicleRemarks,
            "status": VehicleStatus,
            "staffId": StaffId
        }),
        success: function (data) {
            console.log("Vehicle added successfully", data);
            if (data.code === 201) {
                alert("Vehicle saved successfully.");
                getAllVehicles();
                $("#addVehicleForm")[0].reset();
            } else {
                alert("Error: " + data.message);
            }
        },
        error: function (xhr, status, error) {
            console.log("Error adding Vehicle:", error);
            // Extract meaningful error message if available
            let errorMessage = xhr.responseJSON && xhr.responseJSON.message ? xhr.responseJSON.message : "An error occurred while adding Vehicle.";
            alert(errorMessage);
        }
    });
}

function getAllVehicles() {
    let token = localStorage.getItem("token");
    $.ajax({
        method: "GET", url: "http://localhost:8081/api/v1/Vehicle/get_All_Vehicle", headers: {
            "Authorization": "Bearer " + token
        }, success: function (data) {
            console.log('API Response:', data);

            if (data.code === 200 && Array.isArray(data.data) && data.data.length > 0) {
                $("table tbody").empty();

                data.data.forEach(function (vehicle) {
                    let row = `<tr>
                        <td>${vehicle.id}</td>
                        <td>${vehicle.category}</td>
                        <td>${vehicle.fuelType}</td>
                        <td>${vehicle.licensePlateNumber}</td>
                        <td>${vehicle.remarks}</td>
                        <td>${vehicle.status}</td>
                        <td>${vehicle.staffId}</td>
                        <td>
                            <div class="action-btns">
                                <button class="btn btn-outline-primary btn-sm edit-btn" data-id="${vehicle.id}"
                                        data-bs-toggle="modal" data-bs-target="#updateVehicleModal">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-outline-danger btn-sm delete-btn" data-id="${vehicle.id}">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>`;
                    $("table tbody").append(row);
                });

            } else {
                console.log("No vehicles found.");
                $("table tbody").html("<tr><td colspan='8'>No vehicles available.</td></tr>");
            }
        }, error: function (xhr, status, error) {
            console.error("Error fetching vehicles:", error);
            alert("An error occurred while fetching vehicles. Please try again.");
        }
    });
}

function updateVehicle() {
    let token = localStorage.getItem("token");
    if (!token) {
        alert("Authorization token is missing. Please log in.");
        return;
    }

    let VehicleId = $("#UpdateVehicleId").val();
    let VehicleCategory = $("#UpdateVehicleCategory").val().trim();
    let FuelType = $("#UpdateFuelType").val().trim();
    let LicensePlateNumber = $("#UpdateLicensePlateNumber").val().trim();
    let VehicleRemarks = $("#UpdateVehicleRemarks").val().trim();
    let VehicleStatus = $("#UpdateVehicleStatus").val().trim();
    let StaffId = $("#DisplayStaffId").val();

    console.log(VehicleId, VehicleCategory, FuelType, LicensePlateNumber, VehicleRemarks, VehicleStatus, StaffId);

    if (!VehicleId) {
        alert("Vehicle ID is missing.");
        return;
    }

    let VehicleData = {
        "id": VehicleId, // Added ID
        "category": VehicleCategory,
        "fuelType": FuelType,
        "licensePlateNumber": LicensePlateNumber,
        "remarks": VehicleRemarks,
        "status": VehicleStatus,
        "staffId": StaffId,
    };

    $.ajax({
        method: "PUT",
        contentType: "application/json",
        url: "http://localhost:8081/api/v1/Vehicle/updateVehicle",
        headers: {
            "Authorization": "Bearer " + token
        },
        data: JSON.stringify(VehicleData),
        success: function (response) {
            console.log("Vehicle updated successfully", response);
            if (response.code === 201) {
                alert("Vehicle updated successfully.");
                getAllVehicles();
                $("#updateVehicleForm")[0].reset();
                // Close the modal
                $('#updateVehicleModal').modal('hide');
            } else {
                alert("Error: " + response.message);
            }
        },
        error: function (xhr, status, error) {
            console.log("Error updating Vehicle:", error);
            let errorMessage = xhr.responseJSON && xhr.responseJSON.message ? xhr.responseJSON.message : "An error occurred while updating the vehicle.";
            alert(errorMessage);
        }
    });
}

function deleteVehicle(vehicleId) {
    let token = localStorage.getItem("token");
    if (!token) {
        alert("Authorization token is missing. Please log in.");
        return;
    }

    $.ajax({
        method: "DELETE", url: `http://localhost:8081/api/v1/Vehicle/deleteVehicle/${vehicleId}`, headers: {
            "Authorization": "Bearer " + token
        }, success: function (data) {
            console.log("Vehicle deleted successfully", data);
            if (data.code === 200) {
                alert("Vehicle deleted successfully.");
                // Remove the deleted vehicle row from the table
                $(`button.delete-btn[data-id='${vehicleId}']`).closest('tr').remove();
            } else if (data.code === 404) {
                alert("Error: " + data.message);
            } else {
                alert("Error: " + data.message);
            }
        }, error: function (xhr, status, error) {
            console.log("Error deleting Vehicle:", error);
            let errorMessage = xhr.responseJSON && xhr.responseJSON.message ? xhr.responseJSON.message : "An error occurred while deleting the vehicle.";
            alert(errorMessage);
        }
    });
}

function fetchVehicleDetails(vehicleId) {
    let token = localStorage.getItem("token");
    $.ajax({
        method: "GET", url: `http://localhost:8081/api/v1/Vehicle/Search_Vehicle_By_Id/${vehicleId}`, headers: {
            "Authorization": "Bearer " + token
        }, success: function (response) {
            if (response.code === 200) {
                let vehicle = response.data;

                $("#UpdateVehicleId").val(vehicle.id);
                $("#UpdateVehicleCategory").val(vehicle.category);
                $("#UpdateFuelType").val(vehicle.fuelType);
                $("#UpdateLicensePlateNumber").val(vehicle.licensePlateNumber);
                $("#UpdateVehicleRemarks").val(vehicle.remarks);
                $("#UpdateVehicleStatus").val(vehicle.status);
                $("#UpdateStaffId").val(vehicle.staffId);
            } else {
                alert("Error: " + response.message);
            }
        }, error: function (xhr, status, error) {
            console.error("Error fetching vehicle details:", error);
            alert("An error occurred while fetching the vehicle details. Please try again.");
        }
    });
}
