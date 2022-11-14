const CreateContentService = require('./CreateContentService')
const CreateContentController = require('./CreateContentController')
const ContentRepository = require('../../repositories/ContentRepository')


const contentRepository = new ContentRepository()
const createContentService = new  CreateContentService(contentRepository)
const createContentController = new CreateContentController(createContentService)

module.exports = createContentController