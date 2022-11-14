class loginUserController {
    constructor (loginUserService){
        this.loginUserService = loginUserService
    }
    async handle(request, response){
        const { email, password } = request.body;

        try{
            const {token, user} = await this.loginUserService.execute({ email, password })
            return response.status(200).json({message: 'Usuário autenticado com sucesso', user, token})

        } catch (err) {
            return response.status(err.statusCode).json(err)
        }      
    }
}

module.exports = loginUserController