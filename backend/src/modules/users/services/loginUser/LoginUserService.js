const ErrorApp = require('../../../../shared/Errors/Error')
const jwt = require('jsonwebtoken');
const jwtKey = process.env.PRIVATE_KEY_JWT
const _ = require('lodash')

class loginUserService {
    constructor (userRepository){
        this.userRepository = userRepository
    }
    
    async execute({ email, password }) {
        //LOGICA PARA DADOS FALTANDO
        if(!email || !password){
            throw new ErrorApp('Missing email or password')
        }

        //TRATAMENTO DAS VARIAVEIS
        const newEmail = email.toLowerCase().trim()

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
        const userAlreadyExists = await this.userRepository.findByEmail(newEmail)

        if(!userAlreadyExists) {
            throw new ErrorApp('There is no registered user.')
        }

        const userLogged = _.clone(userAlreadyExists, true)

        //COMPARA PASSWORDS DO USUÁRIO CADASTRADO E USUÁRIO DE LOGIN
        const passwordMatched = await this.userRepository.loginUser(password, userLogged.password)

        if(!passwordMatched) {
            throw new ErrorApp('Password or e-mail are incorrect.', 401)
        }

        //PREPARA VARIÁVEL USERLOGGED PARA ENVIAR AO FRONTEND
        delete userLogged.password
        delete userLogged.created_at

        //ENVIANDO TOKEN PARA USUÁRIO AUTENTICADO
        if(passwordMatched) {
            let token = jwt.sign({
                data:{
                    id_user: userAlreadyExists.id,
                    email_user: userAlreadyExists.email,
                    name_user: userAlreadyExists.name,
                    admin_user: userAlreadyExists.admin
                }
            }, jwtKey, {
                expiresIn:"24h"
            })
            return { token, user: userLogged }
        }
    }
}

module.exports = loginUserService