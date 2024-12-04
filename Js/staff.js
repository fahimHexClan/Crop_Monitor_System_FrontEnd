// Sidebar toggle
document.getElementById('toggleSidebar').addEventListener('click', function() {
    document.getElementById('sidebar').classList.toggle('collapsed');
});

$(document).ready(function() {
    loadLogs(); // Function to load logs
    getAllStaffs(); // Function to get all staff members
});

// Function to load logs (GET request, not POST)
function loadLogs() {
    let token = localStorage.getItem("token");
    if (!token) {
        alert("Authorization token is missing. Please log in.");
        return;
    }

    $.ajax({
        method: "GET",  // Corrected to GET
        url: "http://localhost:8081/api/v1/Monitor/ids",  // Assuming this endpoint is correct for logs
        headers: {
            "Authorization": "Bearer " + token
        },
        success: function (data) {
            let logSelect = $("#LogId");
            logSelect.empty();
            logSelect.append('<option value="" disabled selected>Select Log ID</option>');

            if (Array.isArray(data) && data.length > 0) {
                data.forEach(function (logId) {
                    logSelect.append('<option value="' + logId + '">' + logId + '</option>');
                });
            } else {
                console.warn("No logs available or incorrect data format");
                logSelect.append('<option value="" disabled>No Logs Available</option>');
            }
        },
        error: function (xhr, status, error) {
            console.error("Error loading logs:", error);
            alert("An error occurred while loading log data. Please try again.");
        }
    });
}


function addStaffs() {
    let token = localStorage.getItem("token");
    if (!token) {
        alert("Authorization token is missing. Please log in.");
        return;
    }

    // Get form values (make sure to get the values correctly)
    let StaffId = $("#StaffId").val();
    let S_FirstName = $("#S_FirstName").val();
    let S_LastName = $("#S_LastName").val();
    let Address_1 = $("#Address_1").val();
    let Address_2 = $("#Address_2").val();
    let Address_3 = $("#Address_3").val();
    let Address_4 = $("#Address_4").val();
    let Address_5 = $("#Address_5").val();
    let Contact_Number = $("#Contact_Number").val();
    let Staff_Designation = $("#Staff_Designation").val();
    let Date_Of_Birth = $("#Date_Of_Birth").val();
    let emailAddress = $("#Email_Address").val();
    let Gender = $("#Gender").val();
    let Join_Date = $("#Join_Date").val();
    let Staff_Role = $("#Staff_Role").val();
    let LogId = $("#LogId").val();

    if (!StaffId || !S_FirstName || !S_LastName || !Contact_Number || !Staff_Designation || !Date_Of_Birth || !emailAddress) {
        alert("Please fill in all required fields.");
        return;
    }

    $.ajax({
        method: "POST",
        contentType: "application/json",
        url: "http://localhost:8081/api/v1/Staff",
        headers: {
            "Authorization": "Bearer " + token
        },
        async: true,
        data: JSON.stringify({
            "staffCode": StaffId,
            "firstName": S_FirstName,
            "lastName": S_LastName,
            "designation": Staff_Designation,
            "gender": Gender,
            "joinedDate": Join_Date,
            "dob": Date_Of_Birth,
            "addressLine1": Address_1,
            "addressLine2": Address_2,
            "addressLine3": Address_3,
            "addressLine4": Address_4,
            "addressLine5": Address_5,
            "contactNo": Contact_Number,
            "email": emailAddress,
            "role": Staff_Role,
            "logId": LogId
        }),
        success: function(data) {

            console.log("Staff added successfully");
            alert("Staff saved successfully.");
            //getAllStaffs();
        },
        error: function(xhr, status, error) {
            console.log("Error adding field:", error);
        }
    });
}
function getAllStaffs() {
    let token = localStorage.getItem("token");

    if (!token) {
        alert("Authorization token is missing. Please log in.");
        return;
    }

    $.ajax({
        method: "GET",
        url: "http://localhost:8081/api/v1/Staff",
        headers: {
            "Authorization": "Bearer " + token
        },
        success: function (data) {
            console.log('API Response:', data);

            if (Array.isArray(data) && data.length > 0) {
                // Clear the table before appending new rows
                $("table tbody").empty();

                data.forEach(function (staff) {
                    // Dynamically create the table row using staff data
                    let row = `
                        <tr>
                            <td>${staff.id || staff.StaffCode}</td>
                            <td>${staff.firstName || ''}</td>
                            <td>${staff.lastName || ''}</td>
                            <td>${staff.addressLine1 || ''}</td>
                            <td>${staff.addressLine2 || ''}</td>
                            <td>${staff.addressLine3 || ''}</td>
                            <td>${staff.addressLine4 || ''}</td>
                            <td>${staff.addressLine5 || ''}</td>
                            <td>${staff.contactNo || ''}</td>
                            <td>${staff.designation || ''}</td>
                            <td>${staff.dob || ''}</td>
                            <td>${staff.email || ''}</td>
                            <td>${staff.gender || ''}</td>
                            <td>${staff.joinedDate || ''}</td>
                            <td>${staff.role || ''}</td>
                            <td>${staff.logId || ''}</td>
                            <td>
                                <button class="btn btn-outline-primary btn-sm edit-btn" data-bs-toggle="modal" data-bs-target="#updateStaffModal"><i class="fas fa-edit"></i></button>
                                <button class="btn btn-outline-danger btn-sm delete-btn"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                    `;

                    // Append the row to the table body
                    $("table tbody").append(row);
                });

                // Bind the click event for edit and delete buttons
                $(".edit-btn").on("click", function () {
                    let staffId = $(this).closest("tr").find("td:first").text(); // Get StaffId from the first column
                    // Populate the modal fields with the selected staff's data
                    let staff = data.find(s => s.StaffId === staffId);
                    $("#updateStaffId").val(staff.StaffId);
                    $("#updateStaffName").val(staff.firstName + " " + staff.lastName);
                    $("#updateStaffDesignation").val(staff.designation);
                    $("#updateStaffContact").val(staff.contactNo);
                    $("#updateStaffEmail").val(staff.email);
                });

                $(".delete-btn").on("click", function () {
                    let staffId = $(this).closest("tr").find("td:first").text(); // Get StaffId from the first column
                    if (confirm("Are you sure you want to delete this staff member?")) {
                        deleteStaff(staffId);
                    }
                });

            } else {
                console.log("No staff found.");
                $("table tbody").html("<tr><td colspan='7'>No staff available.</td></tr>");
            }
        },
        error: function(xhr, status, error) {
            console.error("Error fetching staff:", error);
            alert("An error occurred while fetching staff. Please try again.");
        }
    });
}
