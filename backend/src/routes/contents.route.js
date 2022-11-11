const express = require("express");
const createContentController = require('../modules/contents/services/createContent')
const contentsRoutes = express.Router()


contentsRoutes.post('/', (request, response) => {
    return createContentController.handle(request, response)
})

module.exports = contentsRoutes