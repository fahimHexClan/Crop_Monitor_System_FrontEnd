// Sidebar toggle
document.getElementById('toggleSidebar').addEventListener('click', function() {
    document.getElementById('sidebar').classList.toggle('collapsed');
}); document.getElementById('addVehicleForm').addEventListener('submit', function (e) {
    e.preventDefault();

    let vehicleId = document.getElementById('vehicleId').value;
    let vehicleCategory = document.getElementById('vehicleCategory').value;
    let fuelType = document.getElementById('fuelType').value;
    let licensePlateNumber = document.getElementById('licensePlateNumber').value;
    let vehicleRemarks = document.getElementById('vehicleRemarks').value;
    let vehicleStatus = document.getElementById('vehicleStatus').value;
    let staffId = document.getElementById('staffId').value;

    let tableBody = document.getElementById('VehicleTableBody');
    let newRow = tableBody.insertRow();
    newRow.innerHTML = `
            <td>${vehicleId}</td>
            <td>${vehicleCategory}</td>
            <td>${fuelType}</td>
            <td>${licensePlateNumber}</td>
            <td>${vehicleRemarks}</td>
            <td>${vehicleStatus}</td>
            <td>${staffId}</td>
            <td>
                <button class="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#updateVehicleModal" onclick="populateUpdateForm('${vehicleId}')"><i class="fas fa-edit"></i></button>
                <button class="btn btn-outline-danger btn-sm" onclick="deleteVehicle(this)"><i class="fas fa-trash"></i></button>
            </td>
        `;

    document.getElementById('addVehicleForm').reset();
    var addModal = new bootstrap.Modal(document.getElementById('addVehicleModal'));
    addModal.hide();
});

function populateUpdateForm(vehicleId) {
    let vehicleData = getVehicleDataById(vehicleId);
    document.getElementById('UpdateVehicleId').value = vehicleData.id;
    document.getElementById('UpdateVehicleCategory').value = vehicleData.category;
    document.getElementById('UpdateFuelType').value = vehicleData.fuelType;
    document.getElementById('UpdateLicensePlateNumber').value = vehicleData.licensePlateNumber;
    document.getElementById('UpdateVehicleRemarks').value = vehicleData.remarks;
    document.getElementById('UpdateVehicleStatus').value = vehicleData.status;
    document.getElementById('UpdateStaffId').value = vehicleData.staffId;
}

function getVehicleDataById(vehicleId) {
    // Simulating vehicle data fetching. Replace with real API call.
    const vehicles = [
        { id: 'V001', category: 'Tractor', fuelType: 'Diesel', licensePlateNumber: 'ABC-1223', remarks: 'New', status: 'Available', staffId: 'S001' },
        { id: 'V002', category: 'Truck', fuelType: 'Petrol', licensePlateNumber: 'XYZ-9876', remarks: 'Used', status: 'Under Maintenance', staffId: 'S002' },
    ];
    return vehicles.find(vehicle => vehicle.id === vehicleId);
}

function deleteVehicle(button) {
    if (confirm("Are you sure you want to delete this vehicle?")) {
        let row = button.closest('tr');
        row.remove();
    }
}

document.getElementById('updateVehicleForm').addEventListener('submit', function (e) {
    e.preventDefault();

    let updatedVehicleId = document.getElementById('UpdateVehicleId').value;
    let updatedVehicleCategory = document.getElementById('UpdateVehicleCategory').value;
    let updatedFuelType = document.getElementById('UpdateFuelType').value;
    let updatedLicensePlateNumber = document.getElementById('UpdateLicensePlateNumber').value;
    let updatedVehicleRemarks = document.getElementById('UpdateVehicleRemarks').value;
    let updatedVehicleStatus = document.getElementById('UpdateVehicleStatus').value;
    let updatedStaffId = document.getElementById('UpdateStaffId').value;

    let tableRows = document.querySelectorAll('#VehicleTableBody tr');
    tableRows.forEach(row => {
        if (row.cells[0].textContent === updatedVehicleId) {
            row.cells[1].textContent = updatedVehicleCategory;
            row.cells[2].textContent = updatedFuelType;
            row.cells[3].textContent = updatedLicensePlateNumber;
            row.cells[4].textContent = updatedVehicleRemarks;
            row.cells[5].textContent = updatedVehicleStatus;
            row.cells[6].textContent = updatedStaffId;
        }
    });

    var updateModal = new bootstrap.Modal(document.getElementById('updateVehicleModal'));
    updateModal.hide();
});