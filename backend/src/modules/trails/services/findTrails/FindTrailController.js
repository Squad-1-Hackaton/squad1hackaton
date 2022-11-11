class FindTrailController {
    constructor (findTrailService){
        this.findTrailService = findTrailService
    }
    async handle(request, response){
        try{
            await this.findTrailService.execute({ name })
            return response.status(201).send()

        } catch (err) {
            return response.status(err.statusCode).json({message: err.message})
        }      
    }
}

module.exports = FindTrailController