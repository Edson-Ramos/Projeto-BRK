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
    let login = document.getElementById("login").value
    let senha = document.getElementById("password").value
    
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
    }).then((data) =>{
            localStorage.removeItem("id_usuario")
            localStorage.removeItem("token")
            localStorage.removeItem("id")
            localStorage.setItem('token', data.access_token)
            localStorage.setItem('id_usuario', data.id)
        return window.location.href = "cadastrar_automovel"
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

function cadastro(){

    let nome = document.querySelector(".nome").value
    let email = document.querySelector(".email").value
    let data_nasc = document.querySelector(".data-nasc").value
    let tel = document.querySelector(".tel").value
    let login = document.querySelector(".login").value
    let senha = document.querySelector(".password").value

    const regex = /^(?=.*[0-9])(?=.*[A-Z]).{8,15}$/
    result = regex.test(String(senha))
    
    
    let dados_usuario = {
        nome : nome,
        email : email,
        data_nasc : data_nasc,
        tel : tel,
        login : login,
        senha : senha
    }

    if (nome == "" || email == "" || data_nasc == "" || tel == "" || login == "" || senha =="")
        return erro_Campo_empty()

    else if(result != true){
        alert("Senha deve ser maior que 8 caracteres, ter 1 letra maiúscula e 1 número")
    }else{
        fetch("/login", 
        {
            method: "PUT",
            body:JSON.stringify(dados_usuario),
            headers:{
                "Content-Type" : "application/json"
            }
        })
        .then((resposta) => {
            if(resposta.status == 200)
                return success()
            else
                return resposta.text()
        })
        .then(function(error){
            erro_cadastro(error)
        })
    }    
}

function success(){
        Swal.fire({
        icon: 'success',
        title: 'Usuário Cadastrado Com Sucesso!',
        showConfirmButton: false,
        timer: 1500   
    })
    setTimeout(() => {  location.reload(); }, 2000)
}

function erro_Campo_empty(){

            Swal.fire({
                icon: 'error',
                title: 'Opss...',
                text: 'Todos os Campos São Obrigatório!'
            })  
}

function erro_cadastro(msg){
    Swal.fire({
        icon: 'error',
        title: 'Algo deu Errado!',
        text: msg
    })
    document.querySelectorAll(".swal2-styled").forEach(function(btnOK){
        btnOK.addEventListener("click", (e) =>{
            location.reload(true)
        })
    })
} 