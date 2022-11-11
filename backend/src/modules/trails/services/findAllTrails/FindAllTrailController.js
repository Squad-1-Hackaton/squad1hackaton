class FindAllTrailController {
    constructor (findAllTrailService){
        this.findAllTrailService = findAllTrailService
    }
    async handle(request, response){
        try{
            const trailsAvailable = await this.findAllTrailService.execute()
            return response.status(200).send(trailsAvailable)

        } catch (err) {
            return response.status(err.statusCode).json({message: err.message})
        }      
    }
}

module.exports = FindAllTrailController