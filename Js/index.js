$(document).ready(function () {

    loadFields();
    loadCrops();
    getAllStaffIds();
    loadVehicles();
    loadEquipment();
    loadLogs();


    $('#toggleSidebar').on('click', function () {
        $('#sidebar').toggleClass('collapsed');
    });
});


function loadFields() {
    if (!token) {
        alert("Authorization token is missing. Please log in.");
        return;
    }
    $.ajax({
        method: "GET", url: "http://localhost:8081/api/v1/field/ids", headers: {
            "Authorization": "Bearer " + token
        }, success: function (data) {
            if (Array.isArray(data) && data.length > 0) {

                $("#fieldsStatus").fadeOut(200, function () {
                    $(this).text(`${data.length} Fields Active`).fadeIn(200);
                });
            } else if (Array.isArray(data) && data.length === 0) {
                console.warn("No field IDs available.");
                $("#fieldsStatus").fadeOut(200, function () {
                    $(this).text(`0 Fields Active`).fadeIn(200);
                });
            } else {
                console.warn("Unexpected data format for Fields.");
                $("#fieldsStatus").fadeOut(200, function () {
                    $(this).text(`N/A`).fadeIn(200);
                });
            }
        }, error: function (xhr, status, error) {
            console.error("Error loading fields:", error);
            alert("An error occurred while loading field data. Please try again.");
            $("#fieldsStatus").fadeOut(200, function () {
                $(this).text(`Error`).fadeIn(200);
            });
        }
    });
}

function loadCrops() {
    if (!token) {
        alert("Authorization token is missing. Please log in.");
        return;
    }
    $.ajax({
        method: "GET", url: "http://localhost:8081/api/v1/crop/ids", headers: {
            "Authorization": "Bearer " + token
        }, success: function (data) {
            if (Array.isArray(data) && data.length > 0) {

                $("#cropsStatus").fadeOut(200, function () {
                    $(this).text(`${data.length} Crops Planted`).fadeIn(200);
                });
            } else if (Array.isArray(data) && data.length === 0) {
                console.warn("No crop IDs available.");

                $("#cropsStatus").fadeOut(200, function () {
                    $(this).text(`0 Crops Planted`).fadeIn(200);
                });
            } else {
                console.warn("Unexpected data format for Crops.");

                $("#cropsStatus").fadeOut(200, function () {
                    $(this).text(`N/A`).fadeIn(200);
                });
            }
        }, error: function (xhr, status, error) {
            console.error("Error loading crops:", error);
            alert("An error occurred while loading crop data. Please try again.");

            $("#cropsStatus").fadeOut(200, function () {
                $(this).text(`Error`).fadeIn(200);
            });
        }
    });
}


function getAllStaffIds() {
    if (!token) {
        alert("Authorization token is missing. Please log in.");
        return;
    }

    $.ajax({
        method: "GET", url: "http://localhost:8081/api/v1/Staff/ids", headers: {
            "Authorization": "Bearer " + token
        }, success: function (data) {
            if (Array.isArray(data) && data.length > 0) {

                $("#staffStatus").fadeOut(200, function () {
                    $(this).text(`${data.length} Staff Working`).fadeIn(200);
                });
            } else if (Array.isArray(data) && data.length === 0) {
                console.warn("No staff IDs available.");

                $("#staffStatus").fadeOut(200, function () {
                    $(this).text(`0 Staff Working`).fadeIn(200);
                });
            } else {
                console.warn("Unexpected data format for Staff.");

                $("#staffStatus").fadeOut(200, function () {
                    $(this).text(`N/A`).fadeIn(200);
                });
            }
        }, error: function (xhr, status, error) {
            console.error("Error fetching staff:", error);
            alert("An error occurred while fetching staff data. Please try again.");

            $("#staffStatus").fadeOut(200, function () {
                $(this).text(`Error`).fadeIn(200);
            });
        }
    });
}

function loadVehicles() {
    if (!token) {
        alert("Authorization token is missing. Please log in.");
        return;
    }
    $.ajax({
        method: "GET", url: "http://localhost:8081/api/v1/Vehicle/ids", headers: {
            "Authorization": "Bearer " + token
        }, success: function (response) {
            console.log(response);


            if (response && response.data && Array.isArray(response.data) && response.data.length > 0) {

                $("#vehiclesStatus").fadeOut(200, function () {
                    $(this).text(`${response.data.length} Vehicles Operational`).fadeIn(200);
                });
            } else if (response && response.data && Array.isArray(response.data) && response.data.length === 0) {
                console.warn("No vehicle IDs available.");

                $("#vehiclesStatus").fadeOut(200, function () {
                    $(this).text(`0 Vehicles Operational`).fadeIn(200);
                });
            } else {
                console.warn("Unexpected data format for Vehicles.");

                $("#vehiclesStatus").fadeOut(200, function () {
                    $(this).text(`N/A`).fadeIn(200);
                });
            }
        }, error: function (xhr, status, error) {
            console.error("Error loading vehicles:", error);
            alert("An error occurred while loading vehicle data. Please try again.");

            $("#vehiclesStatus").fadeOut(200, function () {
                $(this).text(`Error`).fadeIn(200);
            });
        }
    });
}

function loadEquipment() {
    if (!token) {
        alert("Authorization token is missing. Please log in.");
        return;
    }
    $.ajax({
        method: "GET", url: "http://localhost:8081/api/v1/Equipment/ids", headers: {
            "Authorization": "Bearer " + token
        }, success: function (response) {

            if (response && response.data && Array.isArray(response.data) && response.data.length > 0) {

                $("#equipmentStatus").fadeOut(200, function () {
                    $(this).text(`${response.data.length} Equipment Available`).fadeIn(200);
                });
            } else if (response && response.data && Array.isArray(response.data) && response.data.length === 0) {
                console.warn("No equipment IDs available.");

                $("#equipmentStatus").fadeOut(200, function () {
                    $(this).text(`0 Equipment Available`).fadeIn(200);
                });
            } else {
                console.warn("Unexpected data format for Equipment.");

                $("#equipmentStatus").fadeOut(200, function () {
                    $(this).text(`N/A`).fadeIn(200);
                });
            }
        }, error: function (xhr, status, error) {
            console.error("Error loading equipment:", error);
            alert("An error occurred while loading equipment data. Please try again.");

            $("#equipmentStatus").fadeOut(200, function () {
                $(this).text(`Error`).fadeIn(200);
            });
        }
    });
}

function loadLogs() {
    if (!token) {
        alert("Authorization token is missing. Please log in.");
        return;
    }

    $.ajax({
        method: "GET", url: "http://localhost:8081/api/v1/Monitor/ids", headers: {
            "Authorization": "Bearer " + token
        }, success: function (data) {
            if (Array.isArray(data) && data.length > 0) {

                $("#monitoringStatus").fadeOut(200, function () {
                    $(this).text(`${data.length} Logs Recorded`).fadeIn(200);
                });
            } else if (Array.isArray(data) && data.length === 0) {
                console.warn("No monitoring log IDs available.");

                $("#monitoringStatus").fadeOut(200, function () {
                    $(this).text(`0 Logs Recorded`).fadeIn(200);
                });
            } else {
                console.warn("Unexpected data format for Monitoring Logs.");

                $("#monitoringStatus").fadeOut(200, function () {
                    $(this).text(`N/A`).fadeIn(200);
                });
            }
        }, error: function (xhr, status, error) {
            console.error("Error loading monitoring logs:", error);
            alert("An error occurred while loading monitoring log data. Please try again.");

            $("#monitoringStatus").fadeOut(200, function () {
                $(this).text(`Error`).fadeIn(200);
            });
        }
    });
}

$(document).ready(function () {

    var ctx1 = document.getElementById('cropGrowthChart').getContext('2d');
    var cropGrowthChart = new Chart(ctx1, {
        type: 'line', data: {
            labels: ['Crop A', 'Crop B', 'Crop C', 'Crop D'], datasets: [{
                label: 'Growth Percentage',
                data: [75, 60, 90, 80],
                backgroundColor: 'rgba(102, 187, 106, 0.2)',
                borderColor: 'rgba(102, 187, 106, 1)',
                borderWidth: 2
            }]
        }, options: {
            responsive: true, scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true, max: 100
                    }
                }]
            }
        }
    });

    var ctx2 = document.getElementById('equipmentChart').getContext('2d');
    var equipmentChart = new Chart(ctx2, {
        type: 'doughnut', data: {
            labels: ['Available', 'In Use', 'Out of Service'], datasets: [{
                data: [70, 20, 10], backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'], borderWidth: 1
            }]
        }, options: {
            responsive: true
        }
    });
});
