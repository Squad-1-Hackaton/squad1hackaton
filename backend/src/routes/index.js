const express = require("express");

const registrationRoutes = require("./registration.route");
const loginRoutes = require("./login.route")
const trailsRoutes = require("./trails.route")
const authenticateUser = require('../shared/middlewares/authenticateUser')

const router = express.Router();

// Registro das rotas da aplicação

    router.use('/login', loginRoutes);
    router.use('/registration', registrationRoutes)
    router.use('/trails', authenticateUser, trailsRoutes)
    
module.exports = router

