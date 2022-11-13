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
            const registerFound = await prisma.users.findUnique({
                where: {
                        id: Number(idUser),
                },
                include: {
                    trails: true
                }
            })
            const existsRegister = registerFound.trails.find((objTrail) => objTrail.trailId === parseInt(idTrail))
            return existsRegister
        } catch (error) {
            throw new ErrorApp('User ID invalid', 500)
        }
    }

    async registerUserOnTrail(idTrail, idUser){
        try {
            const contentsTrailsById = await prisma.trails.findUnique({
                where: {
                    id: Number(idTrail)
                }
            }).contents()

            const contentsForRegister = contentsTrailsById.map((content)=>{
                const obj = new Object()
                obj['id_user']=idUser
                obj['id_trail']=content.trailId
                obj['id_content']=content.id

                return obj
            })

            await prisma.usersOnContents.createMany({
                data: contentsForRegister
            })

            await prisma.usersOnTrails.create({
                data: {
                    userId: Number(idUser),
                    trailId: Number(idTrail)
                }
            })
        } catch (err) {
            throw new ErrorApp('User already registered in this trail', 500)
        }
    }

    async registerUserOnContent(idTrail, idUser, idContent){

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