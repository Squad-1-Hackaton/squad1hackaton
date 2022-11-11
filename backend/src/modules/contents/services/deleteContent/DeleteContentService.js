const ErrorApp = require('../../../../shared/Errors/Error')
class DeleteContentService {
    constructor (contentRepository){
        this.contentRepository = contentRepository
    }
    
    async execute({ id }) {
        //LOGICA PARA DADOS FALTANDO
        if(!id){
            throw new ErrorApp('ID content is missing')
        }
        return this.contentRepository.deleteContent(id)
    }
}

module.exports = DeleteContentService