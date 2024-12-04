// Sidebar toggle
let fieldIds,logIds;
document.getElementById('toggleSidebar').addEventListener('click', function() {
    document.getElementById('sidebar').classList.toggle('collapsed');
});

$(document).ready(function() {
    loadFields();
    loadLogs();
    getAllCrops();

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


function addCrops() {
    let token = localStorage.getItem("token");
    let CropId = $("#CropId").val();
    let CommonName = $("#CommonName").val();
    let CropScientificName = $("#CropScientificName").val();
    let CropImage = $("#CropImage")[0].files[0];
    let CropCategory = $("#CropCategory").val();
    let Season = $("#Season").val();
    let FieldId = $("#FieldId").val();
    let LogId = $("#LogId").val();

    let formData = new FormData();
    formData.append("cropCode", CropId);
    formData.append("commonName", CommonName);
    formData.append("scientificName", CropScientificName);
    formData.append("category", CropCategory);
    formData.append("cropSeason", Season);
    formData.append("fieldId", FieldId);
    formData.append("logId", LogId);
    if (CropImage) {
        formData.append("cropImage", CropImage);
    }

    $.ajax({
        method: "POST",
        url: "http://localhost:8081/api/v1/crop",
        headers: {
            "Authorization": "Bearer " + token
        },
        contentType: false,
        processData: false,
        data: formData,
        success: function(data) {
            console.log("Crop added successfully");
            getAllCrops();
        },
        error: function(xhr, status, error) {
            console.error("Error adding crop:", error);
            alert("An error occurred while adding the crop. Please try again.");
        }
    });
}
function getAllCrops() {
    let token = localStorage.getItem("token");

    $.ajax({
        method: "GET",
        url: "http://localhost:8081/api/v1/crop",
        headers: {
            "Authorization": "Bearer " + token
        },
        success: function(data) {
            console.log(data);
            if (Array.isArray(data) && data.length > 0) {
                $("table tbody").empty();
                data.forEach(function(crop) {

                    console.log(crop);
                    let cropImage = crop.cropImage;

                    console.log(crop); // Log the cropCode to check if it's correct
                    let row = `<tr class="tbody">
                <td>${crop.id}</td> 
                <td>${crop.category}</td>
                <td>${crop.commonName}</td>
                <td style="width: 30px;">
                    <img src="data:image/jpeg;base64,${cropImage}" alt="Observed Image" class="img-fluid img-thumbnail" style="width: 30px; height: 30px; border-radius: 30px; margin-right: 50%;" />
                </td>
                <td>${crop.scientificName}</td>
                <td>${crop.season}</td>
                <td>${crop.fieldId}</td>
                <td>${crop.logId}</td>
                <td>
                    <div class="action-btns">
                        <button class="btn btn-outline-primary btn-sm edit-btn" data-id="${crop.id}" data-bs-toggle="modal" data-bs-target="#updateCropModal">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-outline-danger btn-sm delete-btn" data-id="${crop.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>`;
                    $("table tbody").append(row);
                });


                $(".edit-btn").on("click", function() {
                    let cropId = $(this).data("id");  // Get the cropId from the data-id attribute

                    // Fetch crop details using the cropId
                    $.ajax({
                        method: "GET",
                        url: "http://localhost:8081/api/v1/crop/" + cropId,
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        },
                        success: function(crop) {
                            fieldIds = crop.fieldId;
                            logIds = crop.logId;

                            // Populate the modal with crop details
                            $("#updateCropId").val(crop.id);
                            $("#updateCropCategory").val(crop.category);
                            $("#updateCommonName").val(crop.commonName);
                            $("#updateScientificName").val(crop.scientificName);
                            $("#updateSeason").val(crop.season);
                        },
                        error: function(xhr, status, error) {
                            console.error("Error fetching crop details:", error);
                            alert("An error occurred while fetching the crop details. Please try again.");
                        }
                    });
                });


                $(".delete-btn").on("click", function() {
                    let cropId = $(this).data("id");
                    if (confirm("Are you sure you want to delete this crop?")) {
                        deletecrop(cropId);  // Use deleteCrop instead of deleteLog
                    }
                });
            } else {
                console.log("No crops found.");
                $("table tbody").html("<tr><td colspan='9'>No crops available.</td></tr>");
            }
        },

        error: function(xhr, status, error) {
            console.error("Error fetching crops:", error);
            alert("An error occurred while fetching crops. Please try again.");
        }
    });
}
function updateCrops() {
    let cropId = $("#updateCropId").val();
    let commonName = $("#updateCommonName").val();
    let scientificName = $("#updateScientificName").val();
    let season = $("#updateSeason").val();
    let cropCategory = $("#updateCropCategory").val();

    // Use the previously fetched fieldIds and logIds
    let fieldId = fieldIds;  // fieldIds from the edit button click
    let logId = logIds;  // logIds from the edit button click

    let formData = new FormData();

    // Ensure these values are being passed
    formData.append("commonName", commonName);
    formData.append("scientificName", scientificName);
    formData.append("category", cropCategory);
    formData.append("cropSeason", season);
    formData.append("fieldId", fieldId);  // Use fieldId from previous fetch
    formData.append("logId", logId);  // Use logId from previous fetch

    // Append the crop image if available
    let cropImage = $("#updateCropImage")[0].files[0];
    if (cropImage) {
        formData.append("cropImage", cropImage);
    }

    let token = localStorage.getItem("token");

    $.ajax({
        method: "PUT",
        url: "http://localhost:8081/api/v1/crop/" + cropId,
        headers: {
            "Authorization": "Bearer " + token
        },
        contentType: false,
        processData: false,
        data: formData,
        success: function(data) {
            console.log("Crop updated successfully");
            alert("Crop updated successfully!");
            getAllCrops();
            $('#updateCropModal').modal('hide');
        },
        error: function(xhr, status, error) {
            console.error("Error updating crop:", error);
            alert("An error occurred while updating the crop. Please try again.");
        }
    });
}



function deletecrop(cropId) {
    let token = localStorage.getItem("token");
    $.ajax({
        method: "DELETE",
        url: "http://localhost:8081/api/v1/crop/" + cropId,
        headers: {
            "Authorization": "Bearer " + token
        },
        success: function(data) {
            console.log("Log deleted successfully");
            getAllCrops();
        },
        error: function(xhr, status, error) {
            console.error("Error deleting log:", error);
            alert("An error occurred while deleting the log. Please try again.");
        }
    });
}
