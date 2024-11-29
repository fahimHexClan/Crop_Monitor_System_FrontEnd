// Sidebar toggle
document.getElementById('toggleSidebar').addEventListener('click', function() {
    document.getElementById('sidebar').classList.toggle('collapsed');
});
<!-- Scripts -->
    // Handle form submission for adding staff
    document.getElementById('addStaffForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get values from the form
    let staffId = document.getElementById('StaffId').value;
    let firstName = document.getElementById('S_FirstName').value;
    let lastName = document.getElementById('S_LastName').value;
    let address1 = document.getElementById('Address_1').value;
    let address2 = document.getElementById('Address_2').value;
    let address3 = document.getElementById('Address_3').value;
    let address4 = document.getElementById('Address_4').value;
    let address5 = document.getElementById('Address_5').value;
    let contactNumber = document.getElementById('Contact_Number').value;
    let designation = document.getElementById('Staff_Designation').value;
    let dob = document.getElementById('Date_Of_Birth').value;
    let email = document.getElementById('Email_Address').value;
    let gender = document.getElementById('Gender').value;
    let joinDate = document.getElementById('Join_Date').value;
    let staffRole = document.getElementById('Staff_Role').value;
    let logId = document.getElementById('LogId').value;

    // Add new row to the table
    let tableBody = document.getElementById('StaffTableBody');
    let newRow = tableBody.insertRow();

    newRow.innerHTML = `
            <td>${staffId}</td>
            <td>${firstName}</td>
            <td>${lastName}</td>
            <td>${address1}</td>
            <td>${address2}</td>
            <td>${address3}</td>
            <td>${address4}</td>
            <td>${address5}</td>
            <td>${contactNumber}</td>
            <td>${designation}</td>
            <td>${dob}</td>
            <td>${email}</td>
            <td>${gender}</td>
            <td>${joinDate}</td>
            <td>${staffRole}</td>
            <td>${logId}</td>
            <td>
                <button class="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#updateStaffModal" onclick="populateUpdateForm('${staffId}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-outline-danger btn-sm" onclick="deleteStaff(this)">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;

    // Clear the form
    document.getElementById('addStaffForm').reset();

    // Close the modal
    var addModal = new bootstrap.Modal(document.getElementById('addStaffModal'));
    addModal.hide();
});

    // Populate update form with selected staff data
    function populateUpdateForm(staffId) {
    // Find staff data by ID (replace this with actual data fetching)
    let staffData = getStaffDataById(staffId);

    // Populate the update form with data
    document.getElementById('updateStaffId').value = staffData.staffId;
    document.getElementById('updateFirstName').value = staffData.firstName;
    document.getElementById('updateLastName').value = staffData.lastName;
    document.getElementById('updateAddress1').value = staffData.address1;
    document.getElementById('updateAddress2').value = staffData.address2;
    document.getElementById('updateAddress3').value = staffData.address3;
    document.getElementById('updateAddress4').value = staffData.address4;
    document.getElementById('updateAddress5').value = staffData.address5;
    document.getElementById('updateContactNumber').value = staffData.contactNumber;
    document.getElementById('updateDesignation').value = staffData.designation;
    document.getElementById('updateEmail').value = staffData.email;
    document.getElementById('updateGender').value = staffData.gender;
    document.getElementById('updateJoinDate').value = staffData.joinDate;
    document.getElementById('updateStaffRole').value = staffData.staffRole;
    document.getElementById('updateLogId').value = staffData.logId;
}

    // Example function to get staff data by ID
    function getStaffDataById(staffId) {
    const staffData = [
{ staffId: 'S001', firstName: 'John', lastName: 'Daniel',address1:'Badulla',address2:'Haliela',address3:'Ketawala',address4:'kandegedra',address5:'Town', contactNumber: '0742312343', designation: 'Manager', dob: '2004-01-23', email: 'John@gmail.com', gender: 'Male', joinDate: '2024-01-23', staffRole: 'Manager', logId: 'L001' }
    // Add other staff data here
    ];
    return staffData.find(staff => staff.staffId === staffId);
}

    // Handle staff delete action
    function deleteStaff(button) {
    if (confirm("Are you sure you want to delete this staff?")) {
    let row = button.closest('tr');
    row.remove();
}
}

    // Handle form submission for updating staff
    document.getElementById('updateStaffForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get updated staff data
    let updatedStaffId = document.getElementById('updateStaffId').value;
    let updatedFirstName = document.getElementById('updateFirstName').value;
    let updatedLastName = document.getElementById('updateLastName').value;
    let updateAddress1 = document.getElementById('updateAddress1').value;
    let updateAddress2 = document.getElementById('updateAddress2').value;
    let updateAddress3 = document.getElementById('updateAddress3').value;
    let updateAddress4 = document.getElementById('updateAddress4').value;
    let updateAddress5 = document.getElementById('updateAddress5').value;
    let updatedContactNumber = document.getElementById('updateContactNumber').value;
    let updatedDesignation = document.getElementById('updateStaffDesignation').value;
    let updatedEmail = document.getElementById('updateEmail').value;
    let updatedGender = document.getElementById('updateGender').value;
    let updatedJoinDate = document.getElementById('updateJoinDate').value;
    let updatedStaffRole = document.getElementById('updateStaffRole').value;
    let updatedLogId = document.getElementById('updateLogId').value;

    // Update the table row (find the staff row by ID)
    let table = document.querySelector('#StaffTableBody');
    let row = Array.from(table.rows).find(row => row.cells[0].textContent === updatedStaffId);

    if (row) {
    row.cells[1].textContent = updatedFirstName;
    row.cells[2].textContent = updatedLastName;
    row.cells[3].textContent = updateAddress1;
    row.cells[4].textContent = updateAddress2;
    row.cells[5].textContent = updateAddress3;
    row.cells[6].textContent = updateAddress4;
    row.cells[7].textContent = updateAddress5;
    row.cells[8].textContent = updatedContactNumber;
    row.cells[9].textContent = updatedDesignation;
    row.cells[10].textContent = updatedEmail;
    row.cells[11].textContent = updatedGender;
    row.cells[12].textContent = updatedJoinDate;
    row.cells[13].textContent = updatedStaffRole;
    row.cells[14].textContent = updatedLogId;
}

    // Close the modal
    var updateModal = new bootstrap.Modal(document.getElementById('updateStaffModal'));
    updateModal.hide();
});
