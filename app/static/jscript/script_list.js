const rota = 'http://localhost:5000'

function get_auto(){
    let id_usuario ={
        id_usuario : JSON.parse(localStorage.getItem("id_usuario"))
    }
   

    const dados_usuario = {
        method: "POST",
        body: JSON.stringify(id_usuario),
        headers: {
            "Content-Type": "application/json"
        }
    }
    fetch(`${rota}/show_room_usuario`, dados_usuario)
       .then(function(response){
           response.json()
           .then(function(data){
               for (file of data.files)
               create_list(file)
           })
           .then(data=>{
               att_auto()
               del_auto()
           })
       })
}

function create_list(file){

    let tbody = document.getElementById("tbody")
    let tr = document.createElement("tr")

    let id = `${file.id}`

    let td_ano_fab = document.createElement("td")
    td_ano_fab.className = "lista"
    td_ano_fab.innerText = `${file.ano_fab}`

    let td_placa = document.createElement("td")
    td_placa.className = "lista"
    td_placa.innerText = `${file.placa}`

    let td_modelo = document.createElement("td")
    td_modelo.className = "lista"
    td_modelo.innerText = `${file.modelo}`

    let td_cor = document.createElement("td")
    td_cor.className = "lista"
    td_cor.innerText = `${file.cor}`

    var btn_del = document.createElement("button")
    btn_del.className = "btn btn-default btn-del"
    btn_del.id = `${file.id}`
    btn_del.title = "Excluir"
    btn_del.style.background = "#FF7373"
    let del_icon = document.createElement("img")
    del_icon.src = "static/icon/trash-fill.svg"


    let btn_att = document.createElement("button")
    btn_att.className = "btn btn-default btn-att"
    btn_att.id = `${file.id}`
    btn_att.title = "Atualizar"
    btn_att.style.background = "#738FFF"
    let att_icon = document.createElement("img")
    att_icon.src = "static/icon/pencil-square.svg"

    btn_del.appendChild(del_icon)
    btn_att.appendChild(att_icon)
    tbody.appendChild(tr)
    tr.appendChild(td_ano_fab)
    tr.appendChild(td_placa)
    tr.appendChild(td_modelo)
    tr.appendChild(td_cor)
    tr.appendChild(btn_del)
    tr.appendChild(btn_att)

}

function att_auto(){
    //Pesquisa de botão de atualizar e captura do evento de click

document.querySelectorAll(".btn-att").forEach(function (btn_att) {
   btn_att.addEventListener("click", (e) => {
       id_auto = btn_att.id
       localStorage.setItem('id', id_auto );   
       window.location.href = "att_auto"
      

   })
})
}


function del_auto(){

    //pesquisa de botão de delete e captura do evento de click

    document.querySelectorAll(".btn-del").forEach(function (btn_del) {
        btn_del.addEventListener("click", (e) => {
            let id_auto = btn_del.id
            window.localStorage.setItem("id", id_auto)       
                alerta_del()
        })
    })
}

function alerta_del(){

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
    },
        buttonsStyling: false
    })

      swalWithBootstrapButtons.fire({
        title: 'Delete!',
        text: "Deseja Excluir Este Registro?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: ' Sim ',
        cancelButtonText: ' Não ',
        reverseButtons: true
      }).then((result) => {
            if (result.isConfirmed) {

                let dado_automovel = {
                    id : window.localStorage.getItem("id")
                }
                fetch("/delete_automovel", {
                    method: "POST",
                    body: JSON.stringify(dado_automovel),
                    headers: {
                            "Content-Type": "application/json"
                    }
                })
                .then((resposta) => {
                  if (resposta.status == 200)
                      return confimacao_del()
                  else
                      return erro_del()
              })     
            }else if(
          
                result.dismiss === Swal.DismissReason.cancel
            ){
                swalWithBootstrapButtons.fire(
                    'Cancelado!',
                    'Operação Cancelada',
                    'error'
                )}
        })
}

function confimacao_del(){
    Swal.fire({
    icon: 'success',
    title: 'Serviço Excluido!',
    showConfirmButton: false,
    timer: 1500   
})
    setTimeout(() => {  location.reload(); }, 2000)
}

function erro_del(){

    Swal.fire({
    icon: 'error',
    title: 'Erro Ao Excluir Serviço',
    text: 'Tente Novamente!'
})

}