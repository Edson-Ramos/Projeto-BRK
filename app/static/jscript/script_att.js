const rota = "http://localhost:5000"


function get_auto(){

    const id_auto = {
        id : JSON.parse(localStorage.getItem('id'))
    }

    const dado_auto = {
        method: "POST",
        body: JSON.stringify(id_auto),
        headers: {
            "Content-Type": "application/json"
        }
    }
    fetch(`${rota}/list_auto_id`, dado_auto)
        .then(function (response) {
            response.json()
                .then(function (data) {
                    for (arquivo of data.files)

                    var ano_fab = document.getElementById("ano_fab")
                    ano_fab.value = `${arquivo.ano_fab}`

                    var placa = document.getElementById("placa")
                    placa.value = `${arquivo.placa}`

                    var modelo = document.getElementById("modelo")
                    modelo.value = `${arquivo.modelo}`

                    var cor = document.getElementById("cor")
                    cor.value = `${arquivo.cor}`
            })
    }) 
}

function atualizar(){
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
                        id : localStorage.getItem("id"),
                        id_usuario : localStorage.getItem('id_usuario'),
                        ano_fab : ano_fab,
                        placa : placa.toUpperCase(),
                        modelo : modelo.toUpperCase(),
                        cor : cor.toUpperCase()
                        }
                    fetch('/atualizar_automovel',
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
                            msg = "Erro Ao Atualizar"
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
    localStorage.removeItem("id")
    setTimeout(() => {  window.location.href = "/show_room"; }, 2000)
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
