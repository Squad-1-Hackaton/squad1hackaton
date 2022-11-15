let user = {}

jQuery(function() { 
    $('form').on('submit', login)
})

function login(event) {
    event.preventDefault()
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
        sessionStorage.setItem('token_orange', response.token)
        sessionStorage.setItem('user_orange', JSON.stringify(response.user))
        window.location.replace("../trilhas/trilhas.html");
    })
}