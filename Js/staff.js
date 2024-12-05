document.getElementById('toggleSidebar').addEventListener('click', function() {
    document.getElementById('sidebar').classList.toggle('collapsed');
});

$(document).ready(function() {
    loadLogs();
    getAllStaffs();
});

function loadLogs() {
    let token = localStorage.getItem("token");
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
        success: function (data) {
            let logSelect = $("#LogId");
            let logSelectUpdate = $("#updateLogId"); // For updating staff
            logSelect.empty();
            logSelectUpdate.empty();
            logSelect.append('<option value="" disabled selected>Select Log ID</option>');
            logSelectUpdate.append('<option value="" disabled selected>Select Log ID</option>');

            if (Array.isArray(data) && data.length > 0) {
                data.forEach(function (logId) {
                    logSelect.append('<option value="' + logId + '">' + logId + '</option>');
                    logSelectUpdate.append('<option value="' + logId + '">' + logId + '</option>');
                });
            } else {
                console.warn("No logs available or incorrect data format");
                logSelect.append('<option value="" disabled>No Logs Available</option>');
                logSelectUpdate.append('<option value="" disabled>No Logs Available</option>');
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
            getAllStaffs();
            $("#addStaffForm")[0].reset();
        },
        error: function(xhr, status, error) {
            console.log("Error adding staff:", error);
            alert("An error occurred while adding staff. Please try again.");
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
                $("table tbody").empty();

                data.forEach(function (staff) {
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
                                <button class="btn btn-outline-primary btn-sm edit-btn" data-id="${staff.id}" data-bs-toggle="modal" data-bs-target="#updateStaffModal"><i class="fas fa-edit"></i></button>
                                <button class="btn btn-outline-danger btn-sm delete-btn" data-id="${staff.id}"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                    `;

                    $("table tbody").append(row);
                });

                // Edit button
                $(".edit-btn").on("click", function () {
                    let staffid = $(this).data("id");
                    console.log(staffid)
                    $.ajax({
                        method: "GET",
                        url: "http://localhost:8081/api/v1/Staff/" + staffid,
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        },
                        success: function(staff) {
                            $("#updateStaffId").val(staff.id);
                            $("#updateFirstName").val(staff.firstName);
                            $("#updateLastName").val(staff.lastName);
                            $("#updateAddress1").val(staff.addressLine1);
                            $("#updateAddress2").val(staff.addressLine2);
                            $("#updateAddress3").val(staff.addressLine3);
                            $("#updateAddress4").val(staff.addressLine4);
                            $("#updateAddress5").val(staff.addressLine5);
                            $("#updateContactNumber").val(staff.contactNo);
                            $("#updateStaffDesignation").val(staff.designation);
                            $("#updateDateOfBirth").val(staff.dob);
                            $("#updateEmail").val(staff.email);
                            $("#updateGender").val(staff.gender);
                            $("#updateJoinDate").val(staff.joinedDate);
                            $("#updateStaffRole").val(staff.role);
                            $("#updateLogId").val(staff.logId); // Set the staff's logId
                        },
                        error: function(xhr, status, error) {
                            console.error("Error fetching staff details:", error);
                            alert("An error occurred while fetching staff details. Please try again.");
                        }
                    });
                });

                // Delete button
                $(".delete-btn").on("click", function () {
                    let staffId = $(this).data("id");
                    if (confirm("Are you sure you want to delete this staff member?")) {
                        deleteStaff(staffId);
                    }
                });

            } else {
                console.log("No staff found.");
                $("table tbody").html("<tr><td colspan='17'>No staff available.</td></tr>");
            }
        },
        error: function(xhr, status, error) {
            console.error("Error fetching staff:", error);
            alert("An error occurred while fetching staff. Please try again.");
        }
    });
}

function updateStaff() {
    let token = localStorage.getItem("token");
    if (!token) {
        alert("Authorization token is missing. Please log in.");
        return;
    }

    let StaffId = $("#updateStaffId").val();
    let firstName = $("#updateFirstName").val();
    let lastName = $("#updateLastName").val();
    let addressLine1 = $("#updateAddress1").val();
    let addressLine2 = $("#updateAddress2").val();
    let addressLine3 = $("#updateAddress3").val();
    let addressLine4 = $("#updateAddress4").val();
    let addressLine5 = $("#updateAddress5").val();
    let contactNo = $("#updateContactNumber").val();
    let designation = $("#updateStaffDesignation").val();
    let dob = $("#updateDateOfBirth").val();
    let email = $("#updateEmail").val();
    let gender = $("#updateGender").val();
    let joinedDate = $("#updateJoinDate").val();
    let role = $("#updateStaffRole").val();
    let LogId = $("#updateLogId").val(); // Now directly read from #updateLogId

    console.log("Staff ID:", StaffId, firstName, lastName, addressLine1, addressLine2, addressLine3,addressLine4,addressLine5,contactNo,designation,dob,email,gender,joinedDate,role,LogId,email);

    if (!StaffId) {
        alert("Staff ID is missing.");
        return;
    }

    let staffData = {
        "firstName": firstName,
        "lastName": lastName,
        "contactNo": contactNo,
        "email": email,
        "designation": designation,
        "addressLine1": addressLine1,
        "addressLine2": addressLine2,
        "addressLine3": addressLine3,
        "addressLine4": addressLine4,
        "addressLine5": addressLine5,
        "dob": dob,
        "gender": gender,
        "joinedDate": joinedDate,
        "role": role,
        "logId": LogId
    };

    $.ajax({
        method: "PUT",
        contentType: "application/json",
        url: `http://localhost:8081/api/v1/Staff/${StaffId}`,
        headers: {
            "Authorization": "Bearer " + token
        },
        async: true,
        data: JSON.stringify(staffData),
        success: function(data) {
            console.log("Staff updated successfully", data);
            alert("Staff updated successfully.");
            getAllStaffs();
        },
        error: function(xhr, status, error) {
            console.log("Error updating staff:", error);
            alert("An error occurred while updating staff.");
        }
    });
}

function deleteStaff(staffId) {
    let token = localStorage.getItem("token");
    if (!token) {
        alert("Authorization token is missing. Please log in.");
        return;
    }

    $.ajax({
        method: "DELETE",
        url: `http://localhost:8081/api/v1/Staff/${staffId}`,
        headers: {
            "Authorization": "Bearer " + token
        },
        success: function(data) {
            console.log("Staff deleted successfully", data);
            alert("Staff deleted successfully.");
            getAllStaffs();
        },
        error: function(xhr, status, error) {
            console.log("Error deleting staff:", error);
            alert("An error occurred while deleting staff.");
        }
    });
}
