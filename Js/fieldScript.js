// Sidebar toggle
document.getElementById('toggleSidebar').addEventListener('click', function() {
    document.getElementById('sidebar').classList.toggle('collapsed');
});

// Handle form submission for adding field
document.getElementById('addFieldForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let fieldName = document.getElementById('fieldName').value;
    let fieldLocation = document.getElementById('fieldLocation').value;
    let extentSize = document.getElementById('extentSize').value;
    let LogId = document.getElementById('LogId').value;

    // Add the new field to the table
    let tableBody = document.getElementById('fieldTableBody');
    let newRow = tableBody.insertRow();

    newRow.innerHTML = `
            <td>F002</td>
            <td>${fieldName}</td>
            <td>${fieldLocation}</td>
            <td>${extentSize}</td>
            <td><img src="assets/field1.jpg" alt="Field Image 1" class="img-fluid" width="100"></td>
            <td><img src="assets/field2.jpg" alt="Field Image 2" class="img-fluid" width="100"></td>
            <td>${LogId}</td>
            <td>
                <button class="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#updateFieldModal"><i class="fas fa-edit"></i></button>
                <button class="btn btn-outline-danger btn-sm"><i class="fas fa-trash"></i></button>
            </td>
        `;

    // Clear the form
    document.getElementById('addFieldForm').reset();
    // Close the modal
    var addModal = new bootstrap.Modal(document.getElementById('addFieldModal'));
    addModal.hide();
});