class RegisterUserOnTrailController {
    constructor (registerUserOnTrailService){
        this.registerUserOnTrailService = registerUserOnTrailService
    }
    async handle(request, response){
        const { idTrail } = request.params;
        const { user } = request

        try{
            await this.registerUserOnTrailService.execute({ idTrail, user })
            return response.status(200).json({message: 'User registered successfully'})

        } catch (err) {
            return response.status(err.statusCode).json(err)
        }      
    }
}

module.exports = RegisterUserOnTrailController