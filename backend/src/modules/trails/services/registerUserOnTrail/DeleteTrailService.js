const ErrorApp = require('../../../../shared/Errors/Error');

class DeleteTrailService {
    constructor (trailRepository){
        this.trailRepository = trailRepository
    }
    
    async execute({ id }) {
        //LOGICA PARA DADOS FALTANDO
        if(!id){
            throw new ErrorApp('ID trail is missing')
        }

        await this.trailRepository.findTrailById(id)

        const existsContentsInTrails = await this.trailRepository.findContentByTrail(id)
        
        if( existsContentsInTrails.length !== 0 ) {
            throw new ErrorApp('There is content registered in the selected trail')
        }
        
        return this.trailRepository.deleteTrail(id)

    }
}

module.exports = DeleteTrailService