const token = sessionStorage.getItem('token_orange')
const user = JSON.parse(sessionStorage.getItem('user_orange'))

if(!token || !user){
    window.location.replace("../login/login.html");
}

