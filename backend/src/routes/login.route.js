const express = require("express");


const loginRoutes = express.Router();

loginRoutes.post("/", (request, response) => {
    const { email, password } = request.body;

    return response.send('login')
});

module.exports = loginRoutes;
