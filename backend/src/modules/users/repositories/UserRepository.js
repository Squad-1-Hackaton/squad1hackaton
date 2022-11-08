const prisma = require('../../../database/prisma');
const User = require("../models/User");
const bcrypt = require('bcrypt');
const ErrorApp = require('../../../shared/Errors/Error');

const saltRounds = 10;

class UserRepository {
    async createUser({ email, password, name}){

        const passwordHash = bcrypt.hashSync(password, saltRounds)
        if (!passwordHash) {
            throw new ErrorApp('Problem server', 500)
        }
        
        const newUser = new User(email, passwordHash, name)

        const user = await prisma.user.create({
            data: newUser
        })
        
        return user
        
    }

    async findByEmail(email) {
        console.log(email)
        const userFinded = await prisma.user.findUnique({
            where: {
                email,
            },
        })
        return userFinded
    }
}

module.exports = UserRepository