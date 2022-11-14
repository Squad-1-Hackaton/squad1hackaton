class loginUserController {
    constructor (loginUserService){
        this.loginUserService = loginUserService
    }
    async handle(request, response){
        const { idContent } = request.params;
        const { user } = request

        try{
            await this.loginUserService.execute({ idContent, user })
            return response.status(200).json({message: 'Content successfully registered'})

        } catch (err) {
            return response.status(err.statusCode).json(err)
        }      
    }
}

module.exports = loginUserController