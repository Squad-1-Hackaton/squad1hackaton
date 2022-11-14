const ErrorApp = require('../../../../shared/Errors/Error')
class CreateContentService {
    constructor (contentRepository){
        this.contentRepository = contentRepository
    }
    
    async execute({ title, topic, provider, duration, reference, trailId, type }) {
        //LOGICA PARA DADOS FALTANDO
        if(!title || !reference || !trailId || !type){
            throw new ErrorApp('Title, reference or trail are missing')
        }

        if(type !== 'Artigo' && type !== 'Video' && type !== 'Podcast' && type !== 'Curso'){
            throw new ErrorApp('Type invalid')
        }

        if(!Number.isInteger(parseInt(trailId))){
            throw new ErrorApp('ID trail invalid')
        }

        const foundTrail = await this.contentRepository.findTrailByIdRegisterContent(trailId)

        if(foundTrail === null){
            throw new ErrorApp('Trail not registered in the system')
        }

        await this.contentRepository.createContent({ title, topic, provider, duration, reference, trailId, type })
    }
}

module.exports = CreateContentService