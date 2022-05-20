
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
            console.log(modelo_regex)

            if(modelo_regex != true){
                msg = "Digite apenas letras no modelo"
                return alerta_erro(msg)
            }else
            {
                let dados_auto = {
                        id_usuario : "1",
                        ano_fab : ano_fab,
                        placa : placa.toUpperCase(),
                        modelo : modelo.toUpperCase(),
                        cor : cor.toUpperCase()
                        }
                    console.log(dados_auto)
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
                        else
                            return erro_cadastro(resposta.text())
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
    window.location.href = "/listar_auto)";
}