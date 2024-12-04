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


