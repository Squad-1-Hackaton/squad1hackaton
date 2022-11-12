class FindAllTrailService {
    constructor (trailRepository){
        this.trailRepository = trailRepository
    }
    
    async execute({ user }) {
        if (user.admin_user){
            //Retorna todas as trilhas disponíveis
            return this.trailRepository.findAll()
        } else {
            //Retorna todas as trilhas disponíveis informando se o usuário cadastrou ou não
            return this.trailRepository.findTrailsUser(user.id_user)
        }

    }
}

module.exports = FindAllTrailService