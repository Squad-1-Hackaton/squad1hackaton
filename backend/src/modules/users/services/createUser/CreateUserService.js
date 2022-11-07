class CreateUserService {
    constructor (userRepository){
        this.userRepository = userRepository
    }
    
    async execute({ email, password, nome }) {
        // LOGICA PARA VERIFICAR SE JÁ EXISTE EMAIL CADASTRADO
        const userAlreadyExists = await this.userRepository.findByEmail(email)
        
        if(userAlreadyExists) throw ne

        this.userRepository.createUser({ email, password, nome })
    }
}

module.exports = CreateUserService