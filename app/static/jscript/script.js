var btnsignin = document.querySelector("#signin")
var btnsignup = document.querySelector("#signup")
var body = document.querySelector("body")

btnsignin.addEventListener("click", function(){
    body.className = "sign-in-js"
})
btnsignup.addEventListener("click", function(){
    body.className = "sign-up-js"
})


function login(){
    let login = document.querySelector(".login").value
    let senha = document.querySelector(".password").value

    let dados_login = {
        login : login,
        senha : senha
    }

    fetch('/login',
    {
        method : "POST",
        body : JSON.stringify(dados_login),
        headers : {
            "Content-Type" : "application/json"
        }
    }).then(function(response){
        if (response.status == 200){
            return response.json()
        }else
             alerta_erro()
    })

}


function alerta_erro(){
    Swal.fire({
        icon: 'error',
        title: 'Algo deu Errado!',
        text: 'Login ou senha inválidos'
    })
    document.querySelectorAll(".swal2-styled").forEach(function(btnOK){
        btnOK.addEventListener("click", (e) =>{
            location.reload(true)
        })
    })
} 