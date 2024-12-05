// Sidebar Toggle Logic
$(document).ready(function() {
    // Initialize all counts on page load
    loadFields();
    loadCrops();
    getAllStaffIds();
    loadVehicles();
    loadEquipment();
    loadLogs();

    // Sidebar toggle functionality
    $('#toggleSidebar').on('click', function() {
        $('#sidebar').toggleClass('collapsed');
    });
});

// Function to fetch Fields IDs and update count
function loadFields() {
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
            if (Array.isArray(data) && data.length > 0) {
                // Update the Fields widget count
                $("#fieldsStatus").fadeOut(200, function() {
                    $(this).text(`${data.length} Fields Active`).fadeIn(200);
                });
            } else if (Array.isArray(data) && data.length === 0) {
                console.warn("No field IDs available.");
                // Update the Fields widget count to indicate no fields
                $("#fieldsStatus").fadeOut(200, function() {
                    $(this).text(`0 Fields Active`).fadeIn(200);
                });
            } else {
                console.warn("Unexpected data format for Fields.");
                // Update the Fields widget count to indicate unexpected format
                $("#fieldsStatus").fadeOut(200, function() {
                    $(this).text(`N/A`).fadeIn(200);
                });
            }
        },
        error: function(xhr, status, error) {
            console.error("Error loading fields:", error);
            alert("An error occurred while loading field data. Please try again.");
            // Update the Fields widget count to indicate an error
            $("#fieldsStatus").fadeOut(200, function() {
                $(this).text(`Error`).fadeIn(200);
            });
        }
    });
}

// Function to fetch Crops IDs and update count
function loadCrops() {
    if (!token) {
        alert("Authorization token is missing. Please log in.");
        return;
    }
    $.ajax({
        method: "GET",
        url: "http://localhost:8081/api/v1/crop/ids",
        headers: {
            "Authorization": "Bearer " + token  // Include the token in the header
        },
        success: function(data) {
            if (Array.isArray(data) && data.length > 0) {
                // Update the Crops widget count
                $("#cropsStatus").fadeOut(200, function() {
                    $(this).text(`${data.length} Crops Planted`).fadeIn(200);
                });
            } else if (Array.isArray(data) && data.length === 0) {
                console.warn("No crop IDs available.");
                // Update the Crops widget count to indicate no crops
                $("#cropsStatus").fadeOut(200, function() {
                    $(this).text(`0 Crops Planted`).fadeIn(200);
                });
            } else {
                console.warn("Unexpected data format for Crops.");
                // Update the Crops widget count to indicate unexpected format
                $("#cropsStatus").fadeOut(200, function() {
                    $(this).text(`N/A`).fadeIn(200);
                });
            }
        },
        error: function(xhr, status, error) {
            console.error("Error loading crops:", error);
            alert("An error occurred while loading crop data. Please try again.");
            // Update the Crops widget count to indicate an error
            $("#cropsStatus").fadeOut(200, function() {
                $(this).text(`Error`).fadeIn(200);
            });
        }
    });
}

// Function to fetch Staff IDs and update count
function getAllStaffIds() {
    if (!token) {
        alert("Authorization token is missing. Please log in.");
        return;
    }

    $.ajax({
        method: "GET",
        url: "http://localhost:8081/api/v1/Staff/ids",
        headers: {
            "Authorization": "Bearer " + token
        },
        success: function(data) {
            if (Array.isArray(data) && data.length > 0) {
                // Update the Staff widget count
                $("#staffStatus").fadeOut(200, function() {
                    $(this).text(`${data.length} Staff Working`).fadeIn(200);
                });
            } else if (Array.isArray(data) && data.length === 0) {
                console.warn("No staff IDs available.");
                // Update the Staff widget count to indicate no staff
                $("#staffStatus").fadeOut(200, function() {
                    $(this).text(`0 Staff Working`).fadeIn(200);
                });
            } else {
                console.warn("Unexpected data format for Staff.");
                // Update the Staff widget count to indicate unexpected format
                $("#staffStatus").fadeOut(200, function() {
                    $(this).text(`N/A`).fadeIn(200);
                });
            }
        },
        error: function(xhr, status, error) {
            console.error("Error fetching staff:", error);
            alert("An error occurred while fetching staff data. Please try again.");
            // Update the Staff widget count to indicate an error
            $("#staffStatus").fadeOut(200, function() {
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
        method: "GET",
        url: "http://localhost:8081/api/v1/Vehicle/ids",
        headers: {
            "Authorization": "Bearer " + token  // Include the token in the header
        },
        success: function(response) {
            console.log(response);  // Check the response structure

            // Assuming the server returns a structure like: { status, message, data }
            if (response && response.data && Array.isArray(response.data) && response.data.length > 0) {
                // Update the Vehicles widget count with the number of vehicles available
                $("#vehiclesStatus").fadeOut(200, function() {
                    $(this).text(`${response.data.length} Vehicles Operational`).fadeIn(200);
                });
            } else if (response && response.data && Array.isArray(response.data) && response.data.length === 0) {
                console.warn("No vehicle IDs available.");
                // Update the Vehicles widget count to indicate no vehicles
                $("#vehiclesStatus").fadeOut(200, function() {
                    $(this).text(`0 Vehicles Operational`).fadeIn(200);
                });
            } else {
                console.warn("Unexpected data format for Vehicles.");
                // Update the Vehicles widget count to indicate unexpected format
                $("#vehiclesStatus").fadeOut(200, function() {
                    $(this).text(`N/A`).fadeIn(200);
                });
            }
        },
        error: function(xhr, status, error) {
            console.error("Error loading vehicles:", error);
            alert("An error occurred while loading vehicle data. Please try again.");
            // Update the Vehicles widget count to indicate an error
            $("#vehiclesStatus").fadeOut(200, function() {
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
        method: "GET",
        url: "http://localhost:8081/api/v1/Equipment/ids",
        headers: {
            "Authorization": "Bearer " + token  // Include the token in the header
        },
        success: function(response) {
            // Check if the response is valid and contains a 'data' property with the equipment IDs
            if (response && response.data && Array.isArray(response.data) && response.data.length > 0) {
                // Update the Equipment widget count with the number of equipment available
                $("#equipmentStatus").fadeOut(200, function() {
                    $(this).text(`${response.data.length} Equipment Available`).fadeIn(200);
                });
            } else if (response && response.data && Array.isArray(response.data) && response.data.length === 0) {
                console.warn("No equipment IDs available.");
                // Update the Equipment widget count to indicate no equipment
                $("#equipmentStatus").fadeOut(200, function() {
                    $(this).text(`0 Equipment Available`).fadeIn(200);
                });
            } else {
                console.warn("Unexpected data format for Equipment.");
                // Update the Equipment widget count to indicate unexpected format
                $("#equipmentStatus").fadeOut(200, function() {
                    $(this).text(`N/A`).fadeIn(200);
                });
            }
        },
        error: function(xhr, status, error) {
            console.error("Error loading equipment:", error);
            alert("An error occurred while loading equipment data. Please try again.");
            // Update the Equipment widget count to indicate an error
            $("#equipmentStatus").fadeOut(200, function() {
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
        method: "GET",
        url: "http://localhost:8081/api/v1/Monitor/ids",
        headers: {
            "Authorization": "Bearer " + token
        },
        success: function(data) {
            if (Array.isArray(data) && data.length > 0) {
                // Update the Monitoring Logs widget count
                $("#monitoringStatus").fadeOut(200, function() {
                    $(this).text(`${data.length} Logs Recorded`).fadeIn(200);
                });
            } else if (Array.isArray(data) && data.length === 0) {
                console.warn("No monitoring log IDs available.");
                // Update the Monitoring Logs widget count to indicate no logs
                $("#monitoringStatus").fadeOut(200, function() {
                    $(this).text(`0 Logs Recorded`).fadeIn(200);
                });
            } else {
                console.warn("Unexpected data format for Monitoring Logs.");
                // Update the Monitoring Logs widget count to indicate unexpected format
                $("#monitoringStatus").fadeOut(200, function() {
                    $(this).text(`N/A`).fadeIn(200);
                });
            }
        },
        error: function(xhr, status, error) {
            console.error("Error loading monitoring logs:", error);
            alert("An error occurred while loading monitoring log data. Please try again.");
            // Update the Monitoring Logs widget count to indicate an error
            $("#monitoringStatus").fadeOut(200, function() {
                $(this).text(`Error`).fadeIn(200);
            });
        }
    });
}

// Chart Initialization
$(document).ready(function() {
    // Crop Growth Chart
    var ctx1 = document.getElementById('cropGrowthChart').getContext('2d');
    var cropGrowthChart = new Chart(ctx1, {
        type: 'line',
        data: {
            labels: ['Crop A', 'Crop B', 'Crop C', 'Crop D'],
            datasets: [{
                label: 'Growth Percentage',
                data: [75, 60, 90, 80],
                backgroundColor: 'rgba(102, 187, 106, 0.2)',
                borderColor: 'rgba(102, 187, 106, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: 100
                    }
                }]
            }
        }
    });

    // Equipment Usage Chart
    var ctx2 = document.getElementById('equipmentChart').getContext('2d');
    var equipmentChart = new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: ['Available', 'In Use', 'Out of Service'],
            datasets: [{
                data: [70, 20, 10],
                backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true
        }
    });
});
