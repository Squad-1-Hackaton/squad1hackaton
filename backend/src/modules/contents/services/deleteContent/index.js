const DeleteContentService = require('./DeleteContentService')
const DeleteContentController = require('./DeleteContentController')
const ContentRepository = require('../../repositories/contentRepository')


const contentRepository = new ContentRepository()
const deleteContentService = new  DeleteContentService(contentRepository)
const deleteContentController = new DeleteContentController(deleteContentService)

module.exports = deleteContentController