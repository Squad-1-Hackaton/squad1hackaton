class FinAllContentsByTrailController {
    constructor (finAllContentsByTrailService){
        this.finAllContentsByTrailService = finAllContentsByTrailService
    }
    async handle(request, response){
        const { id } = request.params;
        const { user } = request
        try{
            const contentsAvailableByTrail = await this.finAllContentsByTrailService.execute({ id, user })
            return response.status(200).send(contentsAvailableByTrail)

        } catch (err) {
            return response.status(err.statusCode).json(err)
        }      
    }
}

module.exports = FinAllContentsByTrailController