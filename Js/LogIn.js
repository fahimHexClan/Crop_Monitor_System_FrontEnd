$(document).ready(function(){
    $('#show-signup').click(function(e) {
        e.preventDefault();
        Swal.fire({
            icon: 'info',
            title: 'Navigating...',
            text: 'Redirecting you to the signup page.',
            showConfirmButton: false,
            timer: 600
        }).then(() => {
            window.location.href = "SignupPage.html";
        });    });
});
function login() {
    let loginUsername = $('#loginUsername').val()
    let loginPassword = $('#loginPassword').val()


    $.ajax({
        method: "POST",
        contentType: "application/json",
        url: "http://localhost:8081/api/v1/auth/signin",
        async: true,
        data: JSON.stringify({

            "email": loginUsername, "password": loginPassword,


        }),
        success: function (data) {
            localStorage.setItem("token", data.token);
            Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                text: 'You have successfully logged in!',
                showConfirmButton: false,
                timer: 600
            }).then(() => {
            window.location.href = "index.html";
            });
        },
        error: function () {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Invalid username or password. Please try again.'
            });        }

    });
}