const prisma = require('../../../database/prisma');
const ErrorApp = require('../../../shared/Errors/Error');


class contentRepository {
    async createContent({ title, topic, provider, duration, reference, trailId, type }){      
        try {
            const newContent = await prisma.contents.create({
                data:{
                    title, 
                    topic, 
                    provider, 
                    duration, 
                    reference,
                    type,
                    trails: {
                        connect: {
                            id: Number(trailId)
                        }
                    }
                }
            })

            this.updateUserOnContents(newContent.id, trailId, true)
            
        } catch (error) {
            throw new ErrorApp('Failed to create content', 500, '#0009')
        }
    }

    async updateUserOnContents(idContent, trailId, createOrDelete){

        try {
            const usersRegistered = await prisma.usersOnTrails.findMany({
                where: {
                    trailId: Number(trailId)
                }
            })
    
            if(createOrDelete){
                const userRegisteredObj = usersRegistered.map(user => {
                    return {
                        id_user: user.userId,
                        id_trail: parseInt(trailId),
                        id_content: idContent
                    }
                })
               
                await prisma.usersOnContents.createMany({
                    data: userRegisteredObj
                })
            } else {
                const usersRegistedOnContent = await prisma.usersOnContents.findMany({
                    where: {
                        id_trail: Number(trailId),
                        id_content: Number(idContent)
                    }
                })
                const idsToDelete = usersRegistedOnContent.map((user)=>user.id)
    
                await prisma.usersOnContents.deleteMany({
                    where: {
                        id:{
                            in: idsToDelete
                        }
                    }
                })
            }
        } catch (err){
            throw new ErrorApp('Failed to delete content', 500, '#0012')
        }
    }
    async findContentById(id){
        try {
            const contentFound = await prisma.contents.findUnique({
                where: {
                    id: Number(id)
                }
            })
            return contentFound
        } catch (err){
            throw new ErrorApp('Failed to delete content', 500, '#0011')
        }
    }

    async deleteContent(id) {
        try {

            const contentFound = await this.findContentById(id)

            await this.updateUserOnContents(contentFound.id, contentFound.trailId, false)

            await prisma.contents.delete({
                where: {
                    id: Number(id),
                },
            })
        } catch (error) {
            throw new ErrorApp('Failed to delete content', 500, '#0013')
        }
    }

    async findTrailByIdRegisterContent(id){
        try {
            const foundTrail = await prisma.trails.findUnique({
                where: {
                    id: Number(id)
                }
            })

            return foundTrail
            
        } catch (error) {
            throw new ErrorApp('Failed to create content',500,'#0010')
        }
    }
}

module.exports = contentRepository