class FindAllTrailController {
    constructor (findAllTrailService){
        this.findAllTrailService = findAllTrailService
    }
    async handle(request, response){
        const user = request.user

        try{
            const trailsAvailable = await this.findAllTrailService.execute({ user })
            return response.status(200).send(trailsAvailable)

        } catch (err) {
            return response.status(err.statusCode).json({message: err.message})
        }      
    }
}

module.exports = FindAllTrailController