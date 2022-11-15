let user = {}
function login() {
    const email = $('#email').val()
    const password = $('#password').val()
    
    if(!email || !password){
        console.log('Falta preencher e-mail ou password')
        return
    }
  
    loginAPI(email, password)
}

function loginAPI(email, password) {
    const settings = {
        "url": "http://localhost:3000/login",
        "method": "POST",
        "timeout": 0,
        "data": {
          "email": email,
          "password": password
        }
      };
    $.ajax(settings).done(function (response) {
        window.location.replace("../login/login.html");
    })
}