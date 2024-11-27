$(document).ready(function () {
    // Sidebar Toggle Logic
    $('#toggleSidebar').click(function () {
        // Toggle Sidebar Class
        $('#sidebar').toggleClass('collapsed');
        $('#mainContent').toggleClass('collapsed');

        // Correctly Update the Icon Class for the Toggle Button
        if ($('#sidebar').hasClass('collapsed')) {
            $('#toggleSidebar i').removeClass('fa-bars').addClass('fa-times');
            // Hide the "Green Shadow" text when sidebar is collapsed
            $('#brandName').css('opacity', '0');
            setTimeout(() => {
                $('#brandName').css('display', 'none');
            }, 10); // Hide after the transition for a smooth effect
        } else {
            $('#toggleSidebar i').removeClass('fa-times').addClass('fa-bars');
            // Show the "Green Shadow" text when sidebar is expanded
            $('#brandName').css('display', 'block');
            setTimeout(() => {
                $('#brandName').css('opacity', '1');
            }, 10); // Show immediately after changing display
        }
    });

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
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });

    // Equipment Chart
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
