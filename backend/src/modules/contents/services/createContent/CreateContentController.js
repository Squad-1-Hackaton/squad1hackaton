class CreateContentController {
    constructor (createContentService){
        this.createContentService = createContentService
    }
    async handle(request, response){
        const { title, topic, provider, duration, reference, trailId, type } = request.body;

        try{
            await this.createContentService.execute({ title, topic, provider, duration, reference, trailId, type })
            return response.status(201).send()

        } catch (err) {
            return response.status(err.statusCode).json(err)
        }      
    }
}

module.exports = CreateContentController