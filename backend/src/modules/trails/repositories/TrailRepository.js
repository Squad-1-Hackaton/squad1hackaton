const prisma = require('../../../database/prisma');
const Trail = require("../models/Trail");
const ErrorApp = require('../../../shared/Errors/Error');


class TrailRepository {
    async createTrail({ name}){
       
        const newTrail = new Trail(name)

        await prisma.trail.create({
            data: newTrail
        })
    }

    async findByName(name) {
        try {
            const trailFound = await prisma.trail.findUnique({
                where: {
                    name,
                },
            })
            return trailFound
        } catch (error) {
            throw new ErrorApp('Database disconected', 500)
        }

    }
}

module.exports = TrailRepository