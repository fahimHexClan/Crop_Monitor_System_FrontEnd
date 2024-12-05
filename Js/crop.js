// Removed let fieldIds, logIds; as we no longer need these globals

document.getElementById('toggleSidebar').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('collapsed');
});

$(document).ready(function () {
    loadFields();
    loadLogs();
    getAllCrops();
});

function loadFields() {
    let token = localStorage.getItem("token");
    if (!token) {
        alert("Authorization token is missing. Please log in.");
        return;
    }
    $.ajax({
        method: "GET",
        url: "http://localhost:8081/api/v1/field/ids",
        headers: {
            "Authorization": "Bearer " + token
        },
        success: function (data) {
            let fieldSelectAdd = $("#FieldId");
            let fieldSelectUpdate = $("#updateFieldId");

            fieldSelectAdd.empty();
            fieldSelectUpdate.empty();

            fieldSelectAdd.append('<option value="" disabled selected>Select Field ID</option>');
            fieldSelectUpdate.append('<option value="" disabled selected>Select Field ID</option>');

            if (Array.isArray(data) && data.length > 0) {
                data.forEach(function (fieldId) {
                    let option = `<option value="${fieldId}">${fieldId}</option>`;
                    fieldSelectAdd.append(option);
                    fieldSelectUpdate.append(option);
                });
            } else {
                console.warn("No field IDs available or the data format is incorrect.");
                fieldSelectAdd.append('<option value="" disabled>No Fields Available</option>');
                fieldSelectUpdate.append('<option value="" disabled>No Fields Available</option>');
            }
        },
        error: function (xhr, status, error) {
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
        success: function (data) {
            let logSelectAdd = $("#LogId");
            let logSelectUpdate = $("#updateLogId");

            logSelectAdd.empty();
            logSelectUpdate.empty();

            logSelectAdd.append('<option value="" disabled selected>Select Log ID</option>');
            logSelectUpdate.append('<option value="" disabled selected>Select Log ID</option>');

            if (Array.isArray(data) && data.length > 0) {
                data.forEach(function (logId) {
                    let option = `<option value="${logId}">${logId}</option>`;
                    logSelectAdd.append(option);
                    logSelectUpdate.append(option);
                });
            } else {
                console.warn("No logs available or incorrect data format");
                logSelectAdd.append('<option value="" disabled>No Logs Available</option>');
                logSelectUpdate.append('<option value="" disabled>No Logs Available</option>');
            }
        },
        error: function (xhr, status, error) {
            console.error("Error loading logs:", error);
            alert("An error occurred while loading log data. Please try again.");
        }
    });
}

function addCrops() {
    let token = localStorage.getItem("token");
    if (!token) {
        alert("Authorization token is missing. Please log in.");
        return;
    }

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
        success: function (data) {
            console.log("Crop added successfully");
            alert("Crop added successfully!");
            getAllCrops();
            $("#addCropForm")[0].reset();
        },
        error: function (xhr, status, error) {
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
        success: function (data) {
            console.log(data);
            if (Array.isArray(data) && data.length > 0) {
                $("table tbody").empty();
                data.forEach(function (crop) {
                    let cropImage = crop.cropImage;
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

                $(".edit-btn").on("click", function () {
                    let cropId = $(this).data("id");

                    $.ajax({
                        method: "GET",
                        url: "http://localhost:8081/api/v1/crop/" + cropId,
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        },
                        success: function (crop) {
                            // Set the update form fields with the retrieved crop details
                            $("#updateCropId").val(crop.id);
                            $("#updateCropCategory").val(crop.category);
                            $("#updateCommonName").val(crop.commonName);
                            $("#updateScientificName").val(crop.scientificName);
                            $("#updateSeason").val(crop.season);

                            // Set Field and Log ID dropdowns
                            $("#updateFieldId").val(crop.fieldId);
                            $("#updateLogId").val(crop.logId);

                        },
                        error: function (xhr, status, error) {
                            console.error("Error fetching crop details:", error);
                            alert("An error occurred while fetching the crop details. Please try again.");
                        }
                    });
                });

                $(".delete-btn").on("click", function () {
                    let cropId = $(this).data("id");
                    if (confirm("Are you sure you want to delete this crop?")) {
                        deletecrop(cropId);
                    }
                });
            } else {
                console.log("No crops found.");
                $("table tbody").html("<tr><td colspan='9'>No crops available.</td></tr>");
            }
        },
        error: function (xhr, status, error) {
            console.error("Error fetching crops:", error);
            alert("An error occurred while fetching crops. Please try again.");
        }
    });
}

function updateCrops() {
    let token = localStorage.getItem("token");
    if (!token) {
        alert("Authorization token is missing. Please log in.");
        return;
    }

    let cropId = $("#updateCropId").val();
    let commonName = $("#updateCommonName").val();
    let scientificName = $("#updateScientificName").val();
    let season = $("#updateSeason").val();
    let cropCategory = $("#updateCropCategory").val();
    let fieldId = $("#updateFieldId").val();
    let logId = $("#updateLogId").val();

    let formData = new FormData();
    // If server requires cropCode, append it:
    formData.append("cropCode", cropId);

    formData.append("commonName", commonName);
    formData.append("scientificName", scientificName);
    formData.append("category", cropCategory);
    formData.append("cropSeason", season);
    formData.append("fieldId", fieldId);
    formData.append("logId", logId);

    let cropImage = $("#updateCropImage")[0].files[0];
    if (cropImage) {
        formData.append("cropImage", cropImage);
    }

    $.ajax({
        method: "PUT",
        url: "http://localhost:8081/api/v1/crop/" + cropId,
        headers: {
            "Authorization": "Bearer " + token
        },
        contentType: false,
        processData: false,
        data: formData,
        success: function (data) {
            console.log("Crop updated successfully");
            alert("Crop updated successfully!");
            getAllCrops();
            $('#updateCropModal').modal('hide');
        },
        error: function (xhr, status, error) {
            console.error("Error updating crop:", error);
            alert("An error occurred while updating the crop. Please try again.");
        }
    });
}

function deletecrop(cropId) {
    let token = localStorage.getItem("token");
    if (!token) {
        alert("Authorization token is missing. Please log in.");
        return;
    }

    $.ajax({
        method: "DELETE",
        url: "http://localhost:8081/api/v1/crop/" + cropId,
        headers: {
            "Authorization": "Bearer " + token
        },
        success: function (data) {
            console.log("Crop deleted successfully");
            alert("Crop deleted successfully.");
            getAllCrops();
        },
        error: function (xhr, status, error) {
            console.error("Error deleting crop:", error);
            alert("An error occurred while deleting the crop. Please try again.");
        }
    });
}
