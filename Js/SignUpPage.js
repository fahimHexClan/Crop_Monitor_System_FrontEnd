/*fahim@gmail.com-123*/

// Add new log entry
function addLogs() {
    let token = localStorage.getItem("token");
    let signupUserID = $("#signupUserID").val();
    let signupFirstName = $("#signupFirstName").val();
    let signupLastName = $("#signupLastName").val();
    let signupEmail = $("#signupEmail").val();
    let signupPassword = $("#signupPassword").val();
    let signupRole = $("#signupRole").val();

    let profileImage = $("#profileImage")[0].files[0];


    let formData = new FormData(); /* jasonbodu*/

    formData.append("userId", signupUserID);
    formData.append("firstName", signupFirstName);
    formData.append("lastName", signupLastName);
    formData.append("email", signupEmail);
    formData.append("password", signupPassword);
    formData.append("role", signupRole);
    if (profileImage) {
        formData.append("profilePic", profileImage);
    }


    $.ajax({
        method: "POST",
        url: "http://localhost:8081/api/v1/auth/signup",

        headers: {
            "Authorization": "Bearer " + token
        },
        contentType: false,
        processData: false,
        data: formData,
        success: function(data) {
            console.log("Log added successfully");
            alert("Account created successfully!");
            window.location.reload();
        },
        error: function(xhr, status, error) {
            console.error("Error adding log:", error);
            alert("An error occurred while creating the account. Please try again.");
        }
    });

}