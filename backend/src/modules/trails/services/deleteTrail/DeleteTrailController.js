class DeleteTrailController {
    constructor (deleteTrailService){
        this.deleteTrailService = deleteTrailService
    }
    async handle(request, response){
        const { id } = request.params;
        try{
            await this.deleteTrailService.execute({ id })
            return response.status(200).send({message: 'Trail deleted successfully '})

        } catch (err) {
            return response.status(err.statusCode).json({message: err.message})
        }      
    }
}

module.exports = DeleteTrailController