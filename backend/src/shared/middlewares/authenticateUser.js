const jwt = require("jsonwebtoken")
const jwtKey = process.env.PRIVATE_KEY_JWT
const ErrorApp = require('../Errors/Error')

function authenticateUser(request, response, netx) {
    const token = request.header('Authorization')

    jwt.verify(token, jwtKey, (err, decoded) => {
        if(err){
            throw new ErrorApp('Invalid token',401)
        }
        request.user = decoded
    })

    return netx()
}


module.exports = authenticateUser