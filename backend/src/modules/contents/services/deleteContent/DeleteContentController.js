class DeleteContentController {
    constructor (deleteContentService){
        this.deleteContentService = deleteContentService
    }
    async handle(request, response){
        const { id } = request.params;

        try{
            await this.deleteContentService.execute({ id })
            return response.status(200).send({message: 'Content deleted successfully'})

        } catch (err) {
            return response.status(err.statusCode).json(err)
        }      
    }
}

module.exports = DeleteContentController