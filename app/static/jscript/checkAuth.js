function validaction(){
    fetch("/checkAuth", 
    {
        method: "GET",
        headers: {
            "Authorization": "Bearer "+ localStorage.getItem("token")
        }       
    })
    .then(function(response){
        if(response.status != 200){
            window.location.href = "/";
        }
    })
     

}

function logout(){
    
    sair()
    
}

function sair(){

    Swal.fire({
            title: 'Deseja Sair?',
            text: "Você tem Certeza que Deseja Sair?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, Sair Agora!'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("token")
            localStorage.removeItem("nome")
            localStorage.removeItem("tipo")
            Swal.fire(
                'Saiu..!',
                'Volte Sempre',
                'success'
            
        )}
        teste()
    })
}

function teste(){
    document.querySelectorAll(".swal2-confirm").forEach(function(btnOK){
    btnOK.addEventListener("click", (e) =>{
        window.location.href = "/";
    })
})
}

