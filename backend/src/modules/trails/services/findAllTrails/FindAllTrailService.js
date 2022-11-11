class FindAllTrailService {
    constructor (trailRepository){
        this.trailRepository = trailRepository
    }
    
    async execute() {

        return this.trailRepository.findAll()

    }
}

module.exports = FindAllTrailService