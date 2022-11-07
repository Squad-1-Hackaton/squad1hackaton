class CreateUserController {
    constructor (createCategoryService){
        this.createCategoryService = createCategoryService
    }
    async handle(request, response){
        const { email, password, name } = request.body;

        try{

            const user = await this.createCategoryService.execute({ email, password, name })
            return response.status(201).json(JSON.stringify(user))

        } catch (err) {
            return response.status(err.statusCode).json({message: err.message})
        }      
    }
}

module.exports = CreateUserController