
    // Sidebar Toggle Logic
    // Sidebar toggle
    document.getElementById('toggleSidebar').addEventListener('click', function() {
        document.getElementById('sidebar').classList.toggle('collapsed');

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


