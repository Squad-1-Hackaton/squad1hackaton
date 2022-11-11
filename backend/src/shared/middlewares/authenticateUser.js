const jwt = require("jsonwebtoken")
const jwtKey = process.env.PRIVATE_KEY_JWT


function authenticateUser(request, response, netx) {
    const token = request.header('Authorization')

    if(!token) return response.status(401).json({message: 'The token is missing'})

    jwt.verify(token, jwtKey, (err, decoded) => {
        if(err){
            return response.status(401).json({message: 'Invalid token'})
        }
        request.user = decoded.data
    })

    return netx()
}


module.exports = authenticateUser