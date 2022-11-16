jQuery(function() { 
    $('form').on('submit', cadastro)
})


function cadastro(event) {
    event.preventDefault()
    const email = $('#email').val()
    const password = $('#password').val()
    const repassword = $('#confirmar-senha').val()
    const name = $('#nome').val()
    
    if(!email || !password || !name){
        alert('Falta preencher e-mail, password ou nome')
        return
    }

    if(password !== repassword){
        alert('Senhas não conferem')
        return
    }
  
    cadastroAPI(email, password, name)
}

function cadastroAPI(email, password, name) {
    $('#cadastroButton').prop("disabled", true)
    // const settings = {
    //     "url": "http://localhost:3000/registration",
    //     "method": "POST",
    //     "timeout": 0,
    //     "data": {
    //       "email": email,
    //       "password": password,
    //       "name": name
    //     }
    // };
    // $.ajax(settings).done(function (response) {
    //     window.location.assign("../login/login.html");
    // }).fail($('#cadastroButton').prop("disabled", false))

    const settings = {
        "url": "http://localhost:3000/registration",
        "method": "POST",
        "timeout": 0,
        "data": {
          "email": email,
          "password": password,
          "name": name
        },
        "success": function (data) {
            window.location.assign("../login/login.html");
        },
        "error": function (err) {
            alert(err.responseJSON.message)
            $('#cadastroButton').prop("disabled", false)
        }
    };
    $.ajax(settings)
}