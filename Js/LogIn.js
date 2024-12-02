function login(){
    let loginUsername=$('#loginUsername').val()
    let loginPassword=$('#loginPassword').val()


    $.ajax({
        method:"POST",
        contentType:"application/json",
        url:"http://localhost:8081/api/v1/auth/signin",
        async:true,
        data:JSON.stringify({

            "email":loginUsername,
            "password":loginPassword,




        }),
        success:function (data){


            localStorage.setItem("token",data.token);
            window.location.href = "index.html";
            alert("saved")

        },
        error:function (){
            alert("Error")
        }

    });
}