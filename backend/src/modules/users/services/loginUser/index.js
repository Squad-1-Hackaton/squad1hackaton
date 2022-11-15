const LoginUserService = require('./LoginUserService')
const LoginUserController = require('./LoginUserController')
const UserRepository = require('../../repositories/UserRepository')


const userRepository = new UserRepository
const loginUserService = new  LoginUserService(userRepository)
const loginUserController = new LoginUserController(loginUserService)

module.exports = loginUserController