const express = require("express");


const User = require("../models/User");
const UserRepository = require("../repositories/UserRepository");

const userRepository = new UserRepository()

const registrationRoute = express.Router()

registrationRoute.post('/', (request, response) => {
    const { email, password } = request.body;
   
    // Lógica para criptografar senha
  
    userRepository.createUser({ email, password })
 
    console.log(userRepository.users);
  
    // Lógica para salvar em banco de dados
    
    return response.send('registration')
})

module.exports = registrationRoute