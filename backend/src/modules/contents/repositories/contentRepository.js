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
            throw new ErrorApp('Creation failure (db)', 500)
        }
    }

    async updateUserOnContents(idContent, trailId, createOrDelete){
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

    }

    async deleteContent(id) {
        try {

            const contentFound = await prisma.contents.findUnique({
                where: {
                    id: Number(id)
                }
            })

            this.updateUserOnContents(contentFound.id, contentFound.trailId, false)

            const deletedContent = await prisma.contents.delete({
                where: {
                    id: Number(id),
                },
            })
            console.log(deletedContent)
        } catch (error) {
            throw new ErrorApp('Invalid id', 400)
        }
    }
}

module.exports = contentRepository