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

        try {
            await prisma.users.create({
                data: newUser
            })
        } catch (error) {
            throw new ErrorApp('Creation failure (db)', 500)
        }
    }

    async findByEmail(email) {
        try {
            const userFound = await prisma.users.findUnique({
                where: {
                    email,
                },
            })
            return userFound
        } catch (error) {
            throw new ErrorApp('Search failed (db)', 500)
        }

    }

    async loginUser(password, passwordHash){
        const passwordMatched = await bcrypt.compareSync(password, passwordHash);
        return passwordMatched
    }

    async findById(idTrail, idUser) {
        try {
            const registerFound = await prisma.users.findMany({
                where: {
                        id: idUser,
                },
                include: {
                    usersontrails: true
                }
            })
            return registerFound
        } catch (error) {
            throw new ErrorApp('User ID invalid', 500)
        }
    }

    async registerUserOnTrail(idTrail, idUser){

    }

    async findTrails(idTrail) {
        try {
            const trailsAvailable = await prisma.trails.findMany()
            
            const trailsIndex = trailsAvailable.map((objTrail) => {
                return objTrail.id
            })

            return trailsIndex.includes(parseInt(idTrail))
        } catch (error) {
            throw new ErrorApp('There is not trail registered', 400)
        }
    }
}

module.exports = UserRepository