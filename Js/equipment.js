// Sidebar toggle
document.getElementById('toggleSidebar').addEventListener('click', function() {
    document.getElementById('sidebar').classList.toggle('collapsed');
});// Add new equipment form submission handler
document.getElementById('addEquipmentForm').addEventListener('submit', function (e) {
    e.preventDefault();

    let equipmentId = document.getElementById('EquipmentId').value;
    let equipmentName = document.getElementById('EquipmentName').value;
    let equipmentStatus = document.getElementById('EquipmentStatus').value;
    let equipmentType = document.getElementById('EquipmentType').value;
    let fieldId = document.getElementById('FieldId').value;
    let staffId = document.getElementById('StaffId').value;

    let tableBody = document.getElementById('EquipmentTableBody');
    let newRow = tableBody.insertRow();
    newRow.innerHTML = `
        <td>${equipmentId}</td>
        <td>${equipmentName}</td>
        <td>${equipmentStatus}</td>
        <td>${equipmentType}</td>
        <td>${fieldId}</td>
        <td>${staffId}</td>
        <td>
            <button class="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#updateEquipmentModal" onclick="populateUpdateForm('${equipmentId}')"><i class="fas fa-edit"></i></button>
            <button class="btn btn-outline-danger btn-sm" onclick="deleteEquipment(this)"><i class="fas fa-trash"></i></button>
        </td>
    `;

    document.getElementById('addEquipmentForm').reset();
    var addModal = new bootstrap.Modal(document.getElementById('addEquipmentModal'));
    addModal.hide();
});

// Populate the update equipment form with existing equipment data
function populateUpdateForm(equipmentId) {
    let equipmentData = getEquipmentDataById(equipmentId);
    document.getElementById('UpdateEquipmentId').value = equipmentData.id;
    document.getElementById('UpdateEquipmentName').value = equipmentData.name;
    document.getElementById('UpdateEquipmentStatus').value = equipmentData.status;
    document.getElementById('UpdateEquipmentType').value = equipmentData.type;
    document.getElementById('UpdateFieldId').value = equipmentData.fieldId;
    document.getElementById('UpdateStaffId').value = equipmentData.staffId;
}

// Simulate fetching equipment data by ID (Replace with real data/API call)
function getEquipmentDataById(equipmentId) {
    const equipment = [
        { id: 'E001', name: 'Dozers', status: 'Available', type: 'Heavy', fieldId: 'F001', staffId: 'S001' },
        { id: 'E002', name: 'Tractors', status: 'In Use', type: 'Heavy', fieldId: 'F002', staffId: 'S002' },
        { id: 'E003', name: 'Mowers', status: 'Maintenance', type: 'Light', fieldId: 'F003', staffId: 'S003' }
    ];
    return equipment.find(item => item.id === equipmentId);
}

// Delete an equipment item from the table
function deleteEquipment(button) {
    if (confirm("Are you sure you want to delete this equipment?")) {
        let row = button.closest('tr');
        row.remove();
    }
}

// Update equipment form submission handler
document.getElementById('updateEquipmentForm').addEventListener('submit', function (e) {
    e.preventDefault();

    let updatedEquipmentId = document.getElementById('UpdateEquipmentId').value;
    let updatedEquipmentName = document.getElementById('UpdateEquipmentName').value;
    let updatedEquipmentStatus = document.getElementById('UpdateEquipmentStatus').value;
    let updatedEquipmentType = document.getElementById('UpdateEquipmentType').value;
    let updatedFieldId = document.getElementById('UpdateFieldId').value;
    let updatedStaffId = document.getElementById('UpdateStaffId').value;

    let tableRows = document.querySelectorAll('#EquipmentTableBody tr');
    tableRows.forEach(row => {
        if (row.cells[0].textContent === updatedEquipmentId) {
            row.cells[1].textContent = updatedEquipmentName;
            row.cells[2].textContent = updatedEquipmentStatus;
            row.cells[3].textContent = updatedEquipmentType;
            row.cells[4].textContent = updatedFieldId;
            row.cells[5].textContent = updatedStaffId;
        }
    });

    var updateModal = new bootstrap.Modal(document.getElementById('updateEquipmentModal'));
    updateModal.hide();
});