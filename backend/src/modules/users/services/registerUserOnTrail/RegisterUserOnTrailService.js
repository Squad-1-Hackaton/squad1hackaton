const ErrorApp = require('../../../../shared/Errors/Error')

class RegisterUserOnTrailService {
    constructor (userRepository){
        this.userRepository = userRepository
    }
    
    async execute({ idTrail, user }) {
        //LOGICA PARA DADOS FALTANDO
        if(!idTrail || idTrail === ':idTrail'){
            throw new ErrorApp('Missing trail ID')
        }

        if(!Number.isInteger(parseInt(idTrail))){
            throw new ErrorApp('ID invalid')
        }

        //LOGICA PARA VER SER O ID TRAIL É VÁLIDO
        const idIsValid = await this.userRepository.findTrails(idTrail)
        if(!idIsValid){
            throw new ErrorApp('Invalid trail ID')
        }

        //LOGICA PARA NÃO ACEITAR REGISTRO DE ADM
        if(user.admin_user){
            throw new ErrorApp('Action not enabled for this user type')
        }

        //VERIFICA SE O USUÁRIO JÁ TEM CADASTRO NESTA TRILHA NO BANCO
        const userAlreadyRegister = await this.userRepository.findById(idTrail, user.id_user)

        if(userAlreadyRegister !== undefined) {
            throw new ErrorApp('User already registered in this trail')
        }

        //REGISTRA USUÁRIO NA TRILHA
        await this.userRepository.registerUserOnTrail(idTrail, user.id_user)       
    }
}

module.exports = RegisterUserOnTrailService