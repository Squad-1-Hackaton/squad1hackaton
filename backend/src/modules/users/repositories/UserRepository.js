const prisma = require('../../../database/prisma');
const User = require("../models/User");
const bcrypt = require('bcrypt');
const ErrorApp = require('../../../shared/Errors/Error');

const saltRounds = 10;

class UserRepository {
    async createUser({ email, password, name}){

        //LOGICA PARA VERIFICAR SE O E-MAIL INFORMADO É E-MAIL
        //LOGICA PARA INFORMAR SE O PASSWORD É COMPOSTO POR LETRAS E NÚMEROS DE, NO MÍNIMO, 6 DÍGITOS

        const passwordHash = bcrypt.hashSync(password, saltRounds)
        
        const newUser = new User(email, passwordHash, name)

        const user = await prisma.user.create({
            data: newUser
        }) 
        
        return user
        
    }

    async findByEmail(email) {
        const user = await prisma.user.findUnique({
            where: {
              email,
            },
          })
        return user
    }


}

module.exports = UserRepository