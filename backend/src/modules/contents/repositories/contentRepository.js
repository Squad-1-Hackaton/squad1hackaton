const prisma = require('../../../database/prisma');
const ErrorApp = require('../../../shared/Errors/Error');


class contentRepository {
    async createContent({ title, topic, provider, duration, reference, trailId, type }){      
        try {
            await prisma.contents.create({
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
        } catch (error) {
            throw new ErrorApp('Creation failure (db)', 500)
        }
    }

    async deleteContent(id) {
        try {
            await prisma.contents.delete({
                where: {
                    id: Number(id),
                },
            })
        } catch (error) {
            throw new ErrorApp('Invalid id', 400)
        }
    }
}

module.exports = contentRepository