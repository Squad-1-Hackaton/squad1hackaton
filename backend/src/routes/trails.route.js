const express = require("express");
// const createUserController = require('../modules/users/services/createUser')
const trailsRoute = express.Router()


trailsRoute.get('/', (request, response) => {
    // return createUserController.handle(request, response)
    return response.send('Acessou!!')
})

module.exports = trailsRoute