// Sidebar toggle
document.getElementById('toggleSidebar').addEventListener('click', function() {
    document.getElementById('sidebar').classList.toggle('collapsed');
});

$(document).ready(function() {
    getAllLogs();
});

// Add new log entry
function addLogs() {
    let token = localStorage.getItem("token");
    let LogID = $("#LogId").val();
    let MonitoringDate = $("#MonitoringDate").val();
    let MonitoringDetail = $("#MonitoringDetail").val();
    let MonitoringImage = $("#MonitoringImage")[0].files[0];
    let formData = new FormData(); /* jasonbodu*/
    formData.append("id", LogID);
    formData.append("logDate", MonitoringDate);
    formData.append("logDetails", MonitoringDetail);
    if (MonitoringImage) {
        formData.append("observedImage", MonitoringImage);
    }

    $.ajax({
        method: "POST",
        url: "http://localhost:8081/api/v1/Monitor",
        headers: {
            "Authorization": "Bearer " + token
        },
        contentType: false,
        processData: false,
        data: formData,
        success: function(data) {
            console.log("Log added successfully");
            getAllLogs(); // Refresh the table after adding
        },
        error: function(xhr, status, error) {
            console.error("Error adding log:", error);
            alert("An error occurred while adding the log. Please try again.");
        }
    });
}

// Get all logs and display them in the table
function getAllLogs() {
    let token = localStorage.getItem("token");

    $.ajax({
        method: "GET",
        url: "http://localhost:8081/api/v1/Monitor",
        headers: {
            "Authorization": "Bearer " + token
        },
        success: function(data) {
            if (Array.isArray(data) && data.length > 0) {
                $("table tbody").empty(); // Clear the table before populating
                data.forEach(function(log) {
                    let observedImage = log.observedImage;
                    let row = `<tr class="tbody">
                        <td>${log.id}</td>
                        <td>${log.logDate}</td>
                        <td>${log.logDetails}</td>
                        <td style="width: 30px;">
                            <img src="data:image/jpeg;base64,${observedImage}" alt="Observed Image" class="img-fluid img-thumbnail" style="width: 30px; height: 30px; border-radius: 30px; margin-right: 50%;" />
                        </td>
                        <td>
                            <div class="action-btns">
                                <button class="btn btn-outline-primary btn-sm edit-btn" data-id="${log.id}" data-log='${JSON.stringify(log)}' data-bs-toggle="modal" data-bs-target="#updateMonitoringModal">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-outline-danger btn-sm delete-btn" data-id="${log.id}">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>`;
                    $("table tbody").append(row);
                });

                // Handle edit button click
                $(".edit-btn").on("click", function() {
                    let log = $(this).data("log");
                    // Populate the modal fields with the selected log's data
                    $("#UpdateLogId").val(log.id);
                    $("#UpdateMonitoringDate").val(log.logDate);
                    $("#UpdateMonitoringDetail").val(log.logDetails);
                    // Optionally, if you want to show the image, you can implement it here
                    // $("#UpdateMonitoringImage").val(log.observedImage);
                });

                // Handle delete button click
                $(".delete-btn").on("click", function() {
                    let logId = $(this).data("id");
                    if (confirm("Are you sure you want to delete this log?")) {
                        deleteLog(logId);
                    }
                });

            } else {
                console.log("No logs found.");
                $("table tbody").html("<tr><td colspan='7'>No logs available.</td></tr>");
            }
        },
        error: function(xhr, status, error) {
            console.error("Error fetching logs:", error);
            alert("An error occurred while fetching logs. Please try again.");
        }
    });
}

// Update log
function updateLog() {
    let token = localStorage.getItem("token");
    let LogID = $("#UpdateLogId").val();
    let MonitoringDate = $("#UpdateMonitoringDate").val();
    let MonitoringDetail = $("#UpdateMonitoringDetail").val();
    let MonitoringImage = $("#UpdateMonitoringImage")[0].files[0];
    let formData = new FormData();
    formData.append("id", LogID);
    formData.append("logDate", MonitoringDate);
    formData.append("logDetails", MonitoringDetail);
    if (MonitoringImage) {
        formData.append("observedImage", MonitoringImage);
    }

    $.ajax({
        method: "PUT",
        url: "http://localhost:8081/api/v1/Monitor/" + LogID,
        headers: {
            "Authorization": "Bearer " + token
        },
        contentType: false,
        processData: false,
        data: formData,
        success: function(data) {
            console.log("Log updated successfully");
            getAllLogs(); // Refresh the table after update
        },
        error: function(xhr, status, error) {
            console.error("Error updating log:", error);
            alert("An error occurred while updating the log. Please try again.");
        }
    });
}

// Delete log
function deleteLog(logId) {
    let token = localStorage.getItem("token");

    $.ajax({
        method: "DELETE",
        url: "http://localhost:8081/api/v1/Monitor/" + logId,
        headers: {
            "Authorization": "Bearer " + token
        },
        success: function(data) {
            console.log("Log deleted successfully");
            getAllLogs(); // Refresh the table after deletion
        },
        error: function(xhr, status, error) {
            console.error("Error deleting log:", error);
            alert("An error occurred while deleting the log. Please try again.");
        }
    });
}
