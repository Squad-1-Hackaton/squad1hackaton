const express = require("express");

const registrationRoutes = require("./registration.route");
const loginRoutes = require("./login.route")

const router = express.Router();

// Registro das rotas da aplicação
router.use('/login', loginRoutes);
router.use('/registration', registrationRoutes)

module.exports = router

