const prisma = require('../../../database/prisma');
const User = require("../models/User");

class UserRepository {
    async createUser({ email, password, name}){
        const user = await prisma.user.create({
            data: {
                email,
                password,
                name
            }
        }) 
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