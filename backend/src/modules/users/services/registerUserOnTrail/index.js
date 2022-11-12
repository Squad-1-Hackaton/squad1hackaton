const RegisterUserOnTrailService = require('./RegisterUserOnTrailService')
const RegisterUserOnTrailController = require('./RegisterUserOnTrailController')
const UserRepository = require('../../repositories/UserRepository')


const userRepository = new UserRepository
const registerUserOnTrailService = new  RegisterUserOnTrailService(userRepository)
const registerUserOnTrailController = new RegisterUserOnTrailController(registerUserOnTrailService)

module.exports = registerUserOnTrailController