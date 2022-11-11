const jwt = require("jsonwebtoken")
const jwtKey = process.env.PRIVATE_KEY_JWT

function userIsAdmin(request, response, netx) {
    const user = request.user

    if(!user){
        return response.status(401).json({message: 'User needs to authenticate'})
    }
    if(!user.admin_user){
        return response.status(403).json({message: 'Invalid access for this user type'})
    }


    return netx()
}


module.exports = userIsAdmin