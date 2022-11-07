const express = require("express");
const createUserController = require('../modules/users/services/createUser')
const registrationRoute = express.Router()


registrationRoute.post('/', (request, response) => {
    return createUserController.handle(request, response)
})

module.exports = registrationRoute