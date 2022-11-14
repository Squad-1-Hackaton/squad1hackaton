const RegisterUserOnContentService = require('./registerUserOnContentService')
const RegisterUserOnContentController = require('./registerUserOnContentController')
const UserRepository = require('../../repositories/UserRepository')


const userRepository = new UserRepository
const registerUserOnContentService = new  RegisterUserOnContentService(userRepository)
const registerUserOnContentController = new RegisterUserOnContentController(registerUserOnContentService)

module.exports = registerUserOnContentController