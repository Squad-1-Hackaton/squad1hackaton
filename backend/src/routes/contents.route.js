const express = require("express");
const deleteContentController = require('../modules/contents/services/deleteContent')
const createContentController = require('../modules/contents/services/createContent')
const contentsRoutes = express.Router()


contentsRoutes.post('/', (request, response) => {
    return createContentController.handle(request, response)
})

contentsRoutes.delete('/:id', (request, response) => {
    return deleteContentController.handle(request, response)
})


module.exports = contentsRoutes