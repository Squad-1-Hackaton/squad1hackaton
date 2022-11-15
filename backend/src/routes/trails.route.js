const express = require("express");
const findAllTrailController = require('../modules/trails/services/findAllTrails')
const findAllContentsByTrailController = require('../modules/trails/services/findAllContentsByTrail')
const deleteTrailController = require('../modules/trails/services/deleteTrail')
const registerUserOnTrailController = require('../modules/users/services/registerUserOnTrail') 

const trailsRoute = express.Router()

const userIsAdmin = require('../shared/middlewares/userIsAdmin')



trailsRoute.get('/', (request, response) => {
    return findAllTrailController.handle(request, response)
})

trailsRoute.get('/:id', (request, response) => {
    return findAllContentsByTrailController.handle(request, response)
})

trailsRoute.post('/:idTrail', (request, response) => {
    return registerUserOnTrailController.handle(request, response)
})

trailsRoute.delete('/:id', userIsAdmin, (request, response) => {
    return deleteTrailController.handle(request, response)
})


module.exports = trailsRoute