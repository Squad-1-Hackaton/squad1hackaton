const UserRepository = require("../../repositories/UserRepository");

class CreateUserController {
    constructor (createCategoryService){
        this.createCategoryService = createCategoryService
    }
    handle(request, response){
        const { email, password, name } = request.body;
        
        this.createCategoryService.execute({ email, password, name })

        return response.status(201).send('gogo')
    }
}

module.exports = CreateUserController