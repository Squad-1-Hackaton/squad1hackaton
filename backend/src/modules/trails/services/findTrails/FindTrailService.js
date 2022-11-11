const ErrorApp = require('../../../../shared/Errors/Error')
class FindTrailService {
    constructor (findRepository){
        this.findRepository = findRepository
    }
    
    async execute({ name }) {
        //LOGICA PARA DADOS FALTANDO
        if(!name){
            throw new ErrorApp('Trail name is missing')
        }

        //TRATAMENTO DAS VARIAVEIS
        const newName = name.trim()

        //VERIFICA SE O USUÁRIO JÁ EXISTE NO BANCO DE DADOS
        const findAlreadyExists =  await this.findRepository.findByName(newName)

        if(findAlreadyExists) {
            throw new ErrorApp('find already exists')
        }

        return this.findRepository.createUser({ name: newName })
    }
}

module.exports = FindTrailService