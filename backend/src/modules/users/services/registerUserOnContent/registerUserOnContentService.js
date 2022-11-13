const ErrorApp = require('../../../../shared/Errors/Error')

class RegisterUserOnContentService {
    constructor (userRepository){
        this.userRepository = userRepository
    }
    
    async execute({ idContent, user }) {
        //LOGICA PARA DADOS FALTANDO
        if(!idContent){
            throw new ErrorApp('Missing id content')
        }

        //LOGICA PARA NÃO PERMITIR ADMIN SE REGISTRAR EM CONTEUDO
        if(user.admin_user){
            throw new ErrorApp('Action not enabled for this user type')
        }


        //VERIFICA SE O CONTEUDO EXISTE NO BANCO DE DADOS
        const contentExists = await this.userRepository.findContentById(idContent)

        if(contentExists === null || contentExists === undefined) {
            throw new ErrorApp('Content does not exist')
        }


        //ALTERA CONTEÚDO CONFORME ID ENVIADO
        await this.userRepository.changeConcludedContentByUser(idContent, user)


    }
}

module.exports = RegisterUserOnContentService