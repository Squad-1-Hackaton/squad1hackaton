const express = require("express");
const loginUserController = require('../modules/users/services/loginUser')


const loginRoutes = express.Router();

loginRoutes.post("/", (request, response) => {

    return loginUserController.handle(request, response)
});

module.exports = loginRoutes;
