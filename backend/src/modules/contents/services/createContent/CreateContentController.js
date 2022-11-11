class CreateContentController {
    constructor (createContentService){
        this.createContentService = createContentService
    }
    async handle(request, response){
        const { title, topic, provider, duration, reference, trailId } = request.body;

        try{
            await this.createContentService.execute({ title, topic, provider, duration, reference, trailId })
            return response.status(201).send()

        } catch (err) {
            return response.status(err.statusCode).json({message: err.message})
        }      
    }
}

module.exports = CreateContentController