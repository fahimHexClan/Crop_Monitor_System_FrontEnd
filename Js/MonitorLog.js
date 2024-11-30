// Sidebar toggle
document.getElementById('toggleSidebar').addEventListener('click', function() {
    document.getElementById('sidebar').classList.toggle('collapsed');
});

// Sidebar toggle
document.getElementById('toggleSidebar').addEventListener('click', function() {
    document.getElementById('sidebar').classList.toggle('collapsed');
});

$(document).ready(function() {
    getAllLogs();
});

function addLog() {
    let LogID = $("#LogID").val();
    let date = $("#date").val();
    let details = $("#details").val();
    let observedImage = $("#observedImage")[0].files[0];
    let token = localStorage.getItem("token");

    let formData = new FormData();
    formData.append("logCode", LogID);
    formData.append("logDate", date);
    formData.append("logDetails", details);
    if (observedImage) {
        formData.append("observedImage", observedImage);
    }

    $.ajax({
        method: "POST",
        url: "http://localhost:8080/api/v1/logs",
        headers: {
            "Authorization": "Bearer " + token
        },
        contentType: false,
        processData: false,
        data: formData,
        success: function (data) {
            Swal.fire({
                icon: 'success',
                title: 'Log Added!',
                text: 'The log was added successfully!',
                background: 'rgba(65,65,66,0.18)',
                showConfirmButton: false,
                timer: 2000
            });
            clearForm();
            getAllLogs();
        },
        error: function () {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Error saving the log.',
                background: 'rgba(65,65,66,0.18)',
                showConfirmButton: true
            });
        }
    });
}

function clearForm() {
    $("#LogID").val('');
    $("#date").val('');
    $("#details").val('');
    $("#observedImage").val('');
    $("#section").val('');
    $("#sectionId").val('');
}

function getAllLogs() {
    let token = localStorage.getItem("token");
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/v1/logs",
        headers: {
            "Authorization": "Bearer " + token
        },
        success: function (data) {
            if (Array.isArray(data) && data.length > 0) {
                $("table tbody").empty();
                data.forEach(function (log) {
                    let observedImage = log.observedImage;
                    let row = `<tr class="tbody">
                        <td>${log.logCode}</td>
                        <td>${log.logDate}</td>
                        <td>${log.logDetails}</td>
                        <td style="width: 30px;">
                            <img src="data:image/jpeg;base64,${observedImage}" alt="Observed Image" class="img-fluid img-thumbnail" style="width: 30px; height: 30px; border-radius: 30px; margin-right: 50%;" />
                        </td>
                        <td>${log.section}</td>
                        <td>${log.sectionId}</td>
                        <td>
                            <div class="action-btns">
                                <button class="btn btn-link text-warning p-0 me-2 edit-btn" data-id="${log.logCode}" data-log='${JSON.stringify(log)}'>
                                    <i class="bi bi-pencil-fill"></i>
                                </button>
                                <button class="btn btn-link text-danger p-0 delete-btn" data-id="${log.logCode}">
                                    <i class="bi bi-trash-fill"></i>
                                </button>
                            </div>
                        </td>
                    </tr>`;
                    $("table tbody").append(row);
                });
                addEditAction();
                addDeleteAction();
            } else {
                $("table tbody").empty();
                $("table tbody").append("<tr><td colspan='7' class='text-center'>No logs available</td></tr>");
            }
        },
        error: function (xhr, status, error) {
            console.error("Error:", status, error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Error getting the Logs. Please try again.',
                background: 'rgba(65,65,66,0.18)',
                showConfirmButton: true
            });
        }
    });
}

function addEditAction() {
    $(".edit-btn").off("click").on("click", function () {
        let log = $(this).data("log");
        $("#LogID1").val(log.logCode);
        $("#date1").val(log.logDate);
        $("#details1").val(log.logDetails);
        $("#section1").val(log.section);
        $("#sectionId1").val(log.sectionId);
        $("#observedImage1").val("");
        $("#exampleModalLong1").modal('show');
    });
}

function addDeleteAction() {
    $(".delete-btn").off("click").on("click", function () {
        let logId = $(this).data("id");
        Swal.fire({
            title: `Are you sure you want to delete Log ID: ${logId}?`,
            text: "This action cannot be undone.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            background: 'rgba(65,65,66,0.18)'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteLog(logId);
            }
        });
    });
}

function deleteLog(logId) {
    let token = localStorage.getItem("token");
    $.ajax({
        method: "DELETE",
        url: `http://localhost:8080/api/v1/logs/${logId}`,
        headers: {
            "Authorization": "Bearer " + token
        },
        success: function () {
            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: `Log ID ${logId} has been deleted successfully.`,
                showConfirmButton: false,
                timer: 2000,
                background: 'rgba(65,65,66,0.18)'
            });
            getAllLogs();
        },
        error: function (xhr, status, error) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Error deleting the log. Please try again.',
                background: 'rgba(65,65,66,0.18)',
                showConfirmButton: true
            });
        }
    });
}

function UpdateLog(logId) {
    let token = localStorage.getItem("token");
    let LogID = $("#LogID1").val();
    let date = $("#date1").val();
    let details = $("#details1").val();
    let observedImage = $("#observedImage1")[0].files[0];

    let formData = new FormData();
    formData.append("logDate", date);
    formData.append("logDetails", details);
    if (observedImage) {
        formData.append("observedImage", observedImage);
    }

    $.ajax({
        method: "PUT",
        url: `http://localhost:8080/api/v1/logs/${LogID}`,
        headers: {
            "Authorization": "Bearer " + token
        },
        data: formData,
        contentType: false,
        processData: false,
        success: function () {
            Swal.fire({
                icon: 'success',
                title: 'Log Updated',
                text: 'The log was updated successfully!',
                showConfirmButton: false,
                timer: 2000,
                background: 'rgba(65,65,66,0.18)'
            });
            getAllLogs();
        },
        error: function (xhr, status, error) {
            console.error("Error:", status, error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Error updating the log. Please try again.',
                background: 'rgba(65,65,66,0.18)',
                showConfirmButton: true
            });
        }
    });
}
