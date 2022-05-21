
function cadastrar(){
    let ano_fab = document.getElementById("ano_fab").value
    let placa = document.getElementById("placa").value
    let modelo = document.getElementById("modelo").value
    let cor = document.getElementById("cor").value
    

        
    if (ano_fab == "" || placa == "" || modelo == "" || cor == ""){
        msg = "Todos os Campos São Obrigatório!"
        return alerta_erro(msg)
    }        
    else{

        const regex_ano = /^(?=.*[0-9]).{4}$/
        ano_fab_regex = regex_ano.test(String(ano_fab))

        if (ano_fab_regex != true){
            msg = "Digite o ano com 4 números"
            return alerta_erro(msg)
        }else
        {
            const regex_modelo = /^(?=.*[A-Z]).{2,20}$/
            modelo_regex = regex_modelo.test(String(modelo.toUpperCase()))
           
            if(modelo_regex != true){
                msg = "Digite apenas letras no modelo"
                return alerta_erro(msg)
            }else
            {
                let dados_auto = {
                        id_usuario : localStorage.getItem('id_usuario'),
                        ano_fab : ano_fab,
                        placa : placa.toUpperCase(),
                        modelo : modelo.toUpperCase(),
                        cor : cor.toUpperCase()
                        }
                    fetch('/cadastrar_auto',
                    {
                        method : "POST",
                        body : JSON.stringify(dados_auto),
                        headers : {
                            "Content-Type" : "application/json"
                        }
                    }).then((resposta) => {
                        if (resposta.status == 200)
                            return success()
                        else{
                            msg = "Placa já existe"
                            return erro_cadastro(msg)
                        }
                            
                    })
            }           
            
        }
      
    }    
    
}

function success(){
        Swal.fire({
        icon: 'success',
        title: 'Automovél Cadastrado Com Sucesso!',
        showConfirmButton: false,
        timer: 1500   
    })
    setTimeout(() => {  location.reload(); }, 2000)
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

function alerta_erro(msg){
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

function load(){
    
    localStorage.removeItem("id")
    window.location.href = "/show_room";
}

function apresentacao(){
    let nomeTitulo = localStorage.getItem("nome")
    let welcome = document.querySelector(".welcome")
    let nomeCli = document.querySelector(".nomeCli")
    
    let bemVindo = document.createElement("output")
    bemVindo.innerText = "Garagem de: "
    bemVindo.style.color = "#2D36EB"

    let nome = document.createElement("output")
    nome.innerText = ` ${nomeTitulo}`
    nome.style.color = "#FF1A00"

    welcome.appendChild(bemVindo)
    bemVindo.appendChild(nome)
}