class FinAllContentsByTrailController {
    constructor (finAllContentsByTrailService){
        this.finAllContentsByTrailService = finAllContentsByTrailService
    }
    async handle(request, response){
        const { id } = request.params;
        try{
            const contentsAvailableByTrail = await this.finAllContentsByTrailService.execute({ id })
            return response.status(200).send(contentsAvailableByTrail)

        } catch (err) {
            return response.status(err.statusCode).json({message: err.message})
        }      
    }
}

module.exports = FinAllContentsByTrailController