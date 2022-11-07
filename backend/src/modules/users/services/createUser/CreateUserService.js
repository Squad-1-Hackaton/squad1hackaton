const errorApp = require('../../../../shared/Errors/Error')
class CreateUserService {
    constructor (userRepository){
        this.userRepository = userRepository
    }
    
    async execute({ email, password, name }) {
        const userAlreadyExists = await this.userRepository.findByEmail(email)
        
        if(userAlreadyExists) {
            throw new errorApp('User already exists')
        }

        return this.userRepository.createUser({ email, password, name })
    }
}

module.exports = CreateUserService