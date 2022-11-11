const ErrorApp = require('../../../../shared/Errors/Error')
class CreateContentService {
    constructor (contentRepository){
        this.contentRepository = contentRepository
    }
    
    async execute({ title, topic, provider, duration, reference, trailId }) {
        //LOGICA PARA DADOS FALTANDO
        if(!title || !reference || !trailId){
            throw new ErrorApp('Title, reference or trail are missing')
        }

        return this.ContentRepository.createContent({ title, topic, provider, duration, reference, trailId })
    }
}

module.exports = CreateContentService