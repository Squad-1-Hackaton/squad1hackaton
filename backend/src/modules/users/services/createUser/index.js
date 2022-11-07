const CreateUserService = require('./CreateUserService')
const CreateUserController = require('./CreateUserController')
const UserRepository = require('../../repositories/UserRepository')


const userRepository = new UserRepository
const createUserService = new  CreateUserService(userRepository)
const createUserController = new CreateUserController(createUserService)

module.exports = createUserController