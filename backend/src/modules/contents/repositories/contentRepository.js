const prisma = require('../../../database/prisma');
const Content = require("../models/Content");
const ErrorApp = require('../../../shared/Errors/Error');


class UserRepository {
    async createContent({ title, topic, provider, duration, reference, trailId }){      
        const newContent = new Content(title, topic, provider, duration, reference, trailId)

        await prisma.contents.create({
            data: newContent
        })
    }

    async deleteContent(id) {
        try {
            const deleteUser = await prisma.user.delete({
                where: {
                    id,
                },
            })
            return deleteUser
        } catch (error) {
            throw new ErrorApp('Database disconected', 500)
        }

    }
}

module.exports = UserRepository