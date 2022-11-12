const { trails } = require('../../../database/prisma');
const prisma = require('../../../database/prisma');
const ErrorApp = require('../../../shared/Errors/Error');


class TrailRepository {
    async findAll(){       
        try {
            const trailsAvailable = await prisma.trails.findMany()
            
            return trailsAvailable
        } catch (error) {
            throw new ErrorApp('User not registered on any trail', 400)
        }
    } 

    async findTrailsUser(id){
        try {
            const trailsRegisteredByUser = await prisma.users.findUnique({
                where: {
                    id: Number(id),
                },
                select: {
                    trails: {
                        select: {
                            trailId: true
                        }
                    }
                },
            })

            const trailsRegistered = trailsRegisteredByUser.trails.map((trailobj) => Object.values(trailobj)).flat()
            const trailsAvailable = await prisma.trails.findMany({
                select: {
                    id: true,
                    name: true
                }
            })

            const trailsAvailableAndRegisteredByUser = trailsAvailable.map((trailObj) => {
                    if(trailsRegistered.includes(trailObj.id)){
                        trailObj['registered'] = true
                    } else {
                        trailObj['registered'] = false
                    }
                    return trailObj
                }
            )


            
            return trailsAvailableAndRegisteredByUser
        } catch (error) {
            throw new ErrorApp('User not registered', 500)
        }
    }

    async findTrailById(id){
        try {
            const foundTrail = await prisma.trails.findUnique({
                where: {
                    id: Number(id)
                }
            })

            if(foundTrail === null) {
                throw new ErrorApp('There is no trail registered')
            }
            
            return foundTrail
        } catch (error) {
            throw new ErrorApp('Invalid id')
        }
    }

    async findContentByTrail (id){
        try {
            const contentsAvailable = await prisma.trails.findUnique({
                where: {
                    id: Number(id),
                }
            }).contents()
            return contentsAvailable
        } catch(error){
            throw new ErrorApp('Invalid trail id')
        }
    }

    async deleteTrail(id){
        try {
            await prisma.trails.delete({
                where: {
                    id: Number(id)
                }
            })
        } catch(error){
            throw new ErrorApp('Invalid trail id')
        }
    }
}

module.exports = TrailRepository