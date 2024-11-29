// Sidebar toggle
document.getElementById('toggleSidebar').addEventListener('click', function() {
    document.getElementById('sidebar').classList.toggle('collapsed');
});
// Handle form submission for adding crop
document.getElementById('addCropForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get values from the form
    let cropId = document.getElementById('CropId').value;
    let cropCategory = document.getElementById('CropCategory').value;
    let commonName = document.getElementById('ScientificName').value; // This seems to be for Common Name
    let cropImage = document.getElementById('CropImage').files[0]?.name || ''; // Getting the image name
    let scientificName = document.getElementById('CropScientificName').value;
    let season = document.getElementById('Season').value;
    let fieldId = document.getElementById('FieldId').value;
    let logId = document.getElementById('LogId').value;

    // Add the new crop to the table
    let tableBody = document.getElementById('CropTableBody');
    let newRow = tableBody.insertRow();

    newRow.innerHTML = `
            <td>${cropId}</td>
            <td>${cropCategory}</td>
            <td>${commonName}</td>
            <td><img src="assets/${cropImage}" alt="${commonName} Image" class="img-fluid" width="100"></td>
            <td>${scientificName}</td>
            <td>${season}</td>
            <td>${fieldId}</td>
            <td>${logId}</td>
            <td>
                <button class="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#updateCropModal" onclick="populateUpdateForm('${cropId}')"><i class="fas fa-edit"></i></button>
                <button class="btn btn-outline-danger btn-sm" onclick="deleteCrop(this)"><i class="fas fa-trash"></i></button>
            </td>
        `;

    // Clear the form
    document.getElementById('addCropForm').reset();
    // Close the modal
    var addModal = new bootstrap.Modal(document.getElementById('addCropModal'));
    addModal.hide();
});

// Populate the update form with the selected crop data
function populateUpdateForm(cropId) {
    // Fetch crop data by cropId (use your own data source, e.g., API call)
    let cropData = getCropDataById(cropId); // Replace this with your data fetching logic

    // Populate the update modal fields
    document.getElementById('updateCropId').value = cropData.id;
    document.getElementById('updateCropCategory').value = cropData.category;
    document.getElementById('updateCommonName').value = cropData.commonName;
    document.getElementById('updateScientificName').value = cropData.scientificName;
    document.getElementById('updateSeason').value = cropData.season;
    document.getElementById('updateFieldId').value = cropData.fieldId;
    document.getElementById('updateLogId').value = cropData.logId;
}

// Example function to fetch crop data (replace this with actual data fetching logic)
function getCropDataById(cropId) {
    const crops = [
        { id: 'C001', category: 'Vegetables', commonName: 'Carrot', scientificName: 'Daucus carota', season: 'Winter', fieldId: 'F001', logId: 'L001' },
        { id: 'C002', category: 'Fruits', commonName: 'Apple', scientificName: 'Malus domestica', season: 'Spring', fieldId: 'F002', logId: 'L002' },
        // Add more crops as needed
    ];
    return crops.find(crop => crop.id === cropId);
}

// Handle the delete crop action
function deleteCrop(button) {
    // Confirm before deleting
    if (confirm("Are you sure you want to delete this crop?")) {
        // Delete the row from the table
        let row = button.closest('tr');
        row.remove();
    }
}

// Handle form submission for updating crop
document.getElementById('updateCropForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get the updated values from the form
    let updatedCropId = document.getElementById('updateCropId').value;
    let updatedCropCategory = document.getElementById('updateCropCategory').value;
    let updatedCommonName = document.getElementById('updateCommonName').value;
    let updatedScientificName = document.getElementById('updateScientificName').value;
    let updatedSeason = document.getElementById('updateSeason').value;
    let updatedFieldId = document.getElementById('updateFieldId').value;
    let updatedLogId = document.getElementById('updateLogId').value;

    // Find the row in the table with the same Crop ID and update its data
    let tableRows = document.querySelectorAll('#CropTableBody tr');
    tableRows.forEach(row => {
        if (row.cells[0].textContent === updatedCropId) {
            row.cells[1].textContent = updatedCropCategory;
            row.cells[2].textContent = updatedCommonName;
            row.cells[4].textContent = updatedScientificName;
            row.cells[5].textContent = updatedSeason;
            row.cells[6].textContent = updatedFieldId;
            row.cells[7].textContent = updatedLogId;
        }
    });

    // Close the update modal
    var updateModal = new bootstrap.Modal(document.getElementById('updateCropModal'));
    updateModal.hide();
});
