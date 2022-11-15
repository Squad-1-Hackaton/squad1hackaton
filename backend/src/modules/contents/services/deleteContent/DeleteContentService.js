const ErrorApp = require('../../../../shared/Errors/Error')
class DeleteContentService {
    constructor (contentRepository){
        this.contentRepository = contentRepository
    }
    
    async execute({ id }) {
        //LOGICA PARA DADOS FALTANDO
        if(!id || id === ':id'){
            throw new ErrorApp('ID content is missing')
        }

        if(!Number.isInteger(parseInt(id))){
            throw new ErrorApp('Invalid ID')            
        }

        const contentFound = await this.contentRepository.findContentById(id)
        if(contentFound === null){
            throw new ErrorApp('Content not found')
        }

        await this.contentRepository.deleteContent(id)
    }
}

module.exports = DeleteContentService