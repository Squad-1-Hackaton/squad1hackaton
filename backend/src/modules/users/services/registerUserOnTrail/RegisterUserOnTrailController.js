class RegisterUserOnTrailController {
    constructor (registerUserOnTrailService){
        this.registerUserOnTrailService = registerUserOnTrailService
    }
    async handle(request, response){
        const { idTrail } = request.params;
        const { user } = request

        try{
            await this.registerUserOnTrailService.execute({ idTrail, user })
            return response.status(201).json()

        } catch (err) {
            return response.status(err.statusCode).json({message: err.message})
        }      
    }
}

module.exports = RegisterUserOnTrailController