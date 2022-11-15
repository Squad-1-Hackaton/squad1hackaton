const prisma = require('../../../database/prisma');
const User = require("../models/User");
const bcrypt = require('bcrypt');
const ErrorApp = require('../../../shared/Errors/Error');

const saltRounds = 10;

class UserRepository {
    async createUser({ email, password, name}){

        const passwordHash = bcrypt.hashSync(password, saltRounds)
        if (!passwordHash) {
            throw new ErrorApp('User creation problem', 500, '#0002')
        }
        
        const newUser = new User(email, passwordHash, name)

        try {
            await prisma.users.create({
                data: newUser
            })
        } catch (error) {
            throw new ErrorApp('User creation problem', 500, '#0003')
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
            throw new ErrorApp('User creation problem', 500, '#0001')
        }
    }

    async findByEmailLogin(email) {
        try {
            const userFound = await prisma.users.findUnique({
                where: {
                    email,
                },
            })
            return userFound
        } catch (error) {
            throw new ErrorApp('Problem logging into the application', 500, '#0004')
        }
    }

    async loginUser(password, passwordHash){
        try {
            const passwordMatched = await bcrypt.compareSync(password, passwordHash);
            return passwordMatched
        } catch (error) {
            throw new ErrorApp('Problem logging into the application', 500, '#0005')
        }
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
            throw new ErrorApp('Failed to register user in an application trail', 500, '#0016')
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
            throw new ErrorApp('Failed to register user in an application trail', 500, '#0017')
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
            throw new ErrorApp('Failed to register user in an application trail', 500, '#0018')
        }
    }

    async findContentById(id){
        try{
            const contentFound = await prisma.contents.findUnique({
                where:{
                    id: Number(id)
                }
            }) 
    
            return contentFound
        } catch (err) {
            throw new ErrorApp('Failed to register content as seen', 500, '#0019')
        }
    }

    async changeConcludedContentByUser(idContent, user) {
        try {
            const contentsFound = await prisma.users.findUnique({
                where: {
                    id: Number(user.id_user)
                },
                include:{
                    contents: true
                }
            })

            const targetContent = contentsFound.contents.find((content) => content.id_content === parseInt(idContent))
            
            
            await prisma.usersOnContents.update({
                where:{
                   id: targetContent.id,   
                },
                data: {
                    concluded: !targetContent.concluded
                }
            })
        } catch(err) {
            throw new ErrorApp('Failed to register content as seen', 500, '#0020')
        }

    }
}

module.exports = UserRepository