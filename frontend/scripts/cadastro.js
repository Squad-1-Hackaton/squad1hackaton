
  
$.ajax(settings).done(function (response) {
console.log(response);
});

function cadastro(e) {
    e.preventDefault()
    const email = $('#email').val()
    const password = $('#password').val()
    const repassword = $('#confirma-senha').val()
    const name = $('#nome').val()
    
    if(!email || !password || !name){
        console.log('Falta preencher e-mail, password ou nome')
        return
    }

    if(password !== repassword){
        console.log('Senhas não conferem')
        return
    }
  
    cadastroAPI(email, password, name)
}

function cadastroAPI(email, password, name) {
    $('#cadastroButton').prop("disabled", true)
    const settings = {
        "url": "http://localhost:3000/registration",
        "method": "POST",
        "timeout": 0,
        "data": {
          "email": email,
          "password": password,
          "name": name
        }
    };
    $.ajax(settings).done(function (response) {
        console.log(response)
        // window.location.href("../login/login.html")
    })
}