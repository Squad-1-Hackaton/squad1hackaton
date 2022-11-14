const ErrorApp = require('../../../../shared/Errors/Error');

class DeleteTrailService {
    constructor (trailRepository){
        this.trailRepository = trailRepository
    }
    
    async execute({ id }) {
        //LOGICA PARA DADOS FALTANDO
        if(!id || id===':id'){
            throw new ErrorApp('ID trail is missing')
        }


        if(!Number.isInteger(parseInt(id))){
            throw new ErrorApp('Invalid ID')
        }

        const foundTrail = await this.trailRepository.findTrailById(id)
        
        if(foundTrail === null) {
            throw new ErrorApp('There is no trail registered')
        }

        const existsContentsInTrails = await this.trailRepository.findContentByTrail(id)
        
        if( existsContentsInTrails.length !== 0 ) {
            throw new ErrorApp('There is content registered in the selected trail')
        }
        
        return this.trailRepository.deleteTrail(id)

    }
}

module.exports = DeleteTrailService