const express = require("express");
const deleteContentController = require('../modules/contents/services/deleteContent')
const createContentController = require('../modules/contents/services/createContent')
const registerUserOnContentController = require('../modules/users/services/registerUserOnContent')

const userIsAdmin = require('../shared/middlewares/userIsAdmin')

const contentsRoutes = express.Router()


contentsRoutes.post('/', userIsAdmin, (request, response) => {
    return createContentController.handle(request, response)
})

contentsRoutes.post('/:idContent', (request, response) => {
    return registerUserOnContentController.handle(request, response)
})

contentsRoutes.delete('/:id', userIsAdmin, (request, response) => {
    return deleteContentController.handle(request, response)
})


module.exports = contentsRoutes