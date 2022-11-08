class CreateUserController {
    constructor (createUserService){
        this.createUserService = createUserService
    }
    async handle(request, response){
        const { email, password, name } = request.body;

        try{
            await this.createUserService.execute({ email, password, name })
            return response.status(201).send()

        } catch (err) {
            return response.status(err.statusCode).json({message: err.message})
        }      
    }
}

module.exports = CreateUserController