const { trails } = require('../../../database/prisma');
const prisma = require('../../../database/prisma');
const ErrorApp = require('../../../shared/Errors/Error');


class TrailRepository {
    async findAll(){       
        try {
            const trailsAvailable = await prisma.trails.findMany()
            
            return trailsAvailable
        } catch (error) {
            throw new ErrorApp('Error finding tracks in the application', 500, '#0014')
        }
    } 

    async findTrailsUser(id){
        try {

            const trailsRegisteredByUser = await prisma.users.findUnique({
                where: {
                    id: Number(id),
                },
                include:{
                     contents:{
                        select: { 
                            id_content:true,
                            concluded: true,
                            id_trail: true
                        }
                     },
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
                    name: true,
                    contents: true
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

           const ResultTrail = trailsAvailableAndRegisteredByUser.map(trail => {
                trail.Total_contents = trail.contents.length
                trail.Total_concluded = trailsRegisteredByUser.contents.filter(content => content.id_trail === trail.id && content.concluded).length
                if(trail.Total_contents > 0){
                    trail.Progress = Math.floor((trail.Total_concluded/trail.Total_contents)*100)
                } else {
                    trail.Progress = 0
                }
                delete  trail.contents
                return trail
           })



            //montar lista de objetos para cada trilha cadastrada no sistema, indicando se o usuário já está registrado o total de aulas da trilha [ ]

            /**
             * await prisma.user.update({
             *  where:{id},
             *  data:{
             * 
             *  }
             * })
             * Voce tem no objeto user , os conteudos cursados
             * trailsRegisteredByUser {
                id: 2,
                email: 'adminfalse@gmail.com',
                password: '$2b$10$ROZD/EyzyehMlX91KrF8c.lI3.o2DLDRoN4l52BfOeYan.d3GJA1u',
                name: 'usuário normal',
                admin: false,
                created_at: 2022-11-12T05:31:19.091Z,
                contents: [ { id_trail:1, id_content: 1, concluded: false },
                            { id_trail:2, id_content: 1, concluded: false },  ],
                trails: [ { trailId: 1 }, { trailId: 3 } ]
                }

                Verificar cada trilha, quantos conteudos tem e quantos conteudos dessa trilha , o usuário ja tem

                const x = user.contents.filter(item=> item.id_trail === trilha.id)
                ....concluded: true

                trailsAvailableAndRegisteredByUser.map(trilha=>...... totalContant:trilha.content.length, totalConcluded: x )


                 trailsAvailableAndRegisteredByUser [
                    {
                        id: 1,
                        name: 'Trilha UX/UI',
                        contents: [ [Object] ],
                        registered: true,
                        totalContent: 10,
                        totalConcluded: 3
                        percentual: (3/10)*100
                    },
                    ...
                ]
             */


            //montar lista de objetos para cada trilha cadastrada no sistema com o total de aulas da trilha [ ]
            

            return ResultTrail

        } catch (error) {
            throw new ErrorApp('Error finding tracks in the application', 500, '#0015')
        }
    }

    async findTrailByIdOnContents(id){
        try {
            const foundTrail = await prisma.trails.findUnique({
                where: {
                    id: Number(id)
                }
            })

            return foundTrail
            
        } catch (error) {
            throw new ErrorApp('There was a problem finding content for the given trail on the server',500,'#0021')
        }
    }

    async findTrailById(id){
        try {
            const foundTrail = await prisma.trails.findUnique({
                where: {
                    id: Number(id)
                }
            })

            return foundTrail
            
        } catch (error) {
            throw new ErrorApp('Failed to delete trail',500,'#0006')
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
        } catch (error) {
            throw new ErrorApp('Failed to delete trail',500,'#0007')
        }
    }

    async deleteTrail(id){
        try {
            await prisma.trails.delete({
                where: {
                    id: Number(id)
                }   
            })
        } catch (error) {
            throw new ErrorApp('Failed to delete trail',500,'#0008')
        }
    }

    async findContentByTrailALL (id){
        try {
            const contentsAvailable = await prisma.trails.findUnique({
                where: {
                    id: Number(id),
                }
            }).contents()
            return contentsAvailable
        } catch (error) {
            throw new ErrorApp('There was a problem finding content for the given trail on the server',500,'#0026')
        }
    }

    async findContentByTrailAndUser(idTrail, user){

        let trailsRegisteredByUser
        try{
            trailsRegisteredByUser = await prisma.users.findUnique({
                where: {
                    id: Number(user.id_user),
                },
                include:{
                     contents:{
                        select: { 
                            id_content:true,
                            concluded: true,
                            id_trail: true
                        }
                     },
                     trails: {
                        select: {
                            trailId: true
                        }
                    }
                },
            })
        }
        catch(err){
            throw new ErrorApp('There was a problem finding content for the given trail on the server',500,'#0022')
        }

        let contentsUser
        try{
            contentsUser = trailsRegisteredByUser.contents.filter(content => content.id_trail === parseInt(idTrail))
            
            if(!user.admin_user && contentsUser.length === 0) {
                throw Error()
            }
        } catch(err){
            throw new ErrorApp('Unregistered user on this trail',400)
        }

        let contentsAvailableByTrail
        try {
            contentsAvailableByTrail = await this.findContentByTrailALL(idTrail)
        } catch (err) {
            throw new ErrorApp('There was a problem finding content for the given trail on the server',500,'#0025')
        }

        let contentsResponse

        if(user.admin_user){
            contentsResponse = {
                contents: contentsAvailableByTrail
            }

            return contentsResponse
        }
        
        let contentsAvailable
        try {           
                contentsAvailable = contentsAvailableByTrail.map(content => {
                    const classes = contentsUser.find(element => element.id_content === content.id)
                    content.concluded = classes.concluded
                    delete content.created_at
                    return content
                })
        }
        catch(err) {
            throw new ErrorApp('User not registered on the trail')
        }
        
        try{
            const contentsConcluded =  contentsAvailable.filter(content => content.concluded === true).length
            let progress = 0
            if(contentsAvailable.length > 0){
                progress = Math.floor((contentsConcluded/contentsAvailable.length)*100)
            }
            
            contentsResponse = {
                contents: contentsAvailable,
                progress: progress
            }

        } catch (err) {
            throw new ErrorApp('There was a problem finding content for the given trail on the server',500,'#0024')
        }

        return contentsResponse  
    }
}

module.exports = TrailRepository