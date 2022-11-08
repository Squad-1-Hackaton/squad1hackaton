const ErrorApp = require('../../../../shared/Errors/Error')
class CreateUserService {
    constructor (userRepository){
        this.userRepository = userRepository
    }
    
    async execute({ email, password, name }) {
        //LOGICA PARA DADOS FALTANDO
        if(!email || !password || !name){
            throw new ErrorApp('Email, password or name are missing')
        }

        //TRATAMENTO DAS VARIAVEIS
        const newEmail = email.toLowerCase().trim()
        const newName = name.toLowerCase().trim()

        //LOGICA PARA VERIFICAR SE O DADO INFORMADO NO CAMPO DE E-MAIL INFORMADO É UM E-MAIL
        const isEmail = newEmail.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)

        if(isEmail === null || isEmail.length > 1){
            throw new ErrorApp('E-mail invalid.')
        }

        //LOGICA PARA INFORMAR SE O PASSWORD É COMPOSTO POR LETRAS E NÚMEROS DE, NO MÍNIMO, 6 DÍGITOS
        if(password.length < 6){
            throw new ErrorApp('Invalid password, enter at least 6 digits.')
        }

        //VERIFICA SE O USUÁRIO JÁ EXISTE NO BANCO DE DADOS
        const userAlreadyExists =  await this.userRepository.findByEmail(newEmail)

        if(userAlreadyExists) {
            throw new ErrorApp('User already exists')
        }

        return this.userRepository.createUser({ email: newEmail, password, name: newName })
    }
}

module.exports = CreateUserService