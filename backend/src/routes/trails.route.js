const express = require("express");
const findAllTrailController = require('../modules/trails/services/findAllTrails')
const findAllContentsByTrailController = require('../modules/trails/services/findAllContentsByTrail')
const deleteTrailController = require('../modules/trails/services/deleteTrail')
const trailsRoute = express.Router()



trailsRoute.get('/', (request, response) => {
    return findAllTrailController.handle(request, response)
})

trailsRoute.get('/:id', (request, response) => {
    return findAllContentsByTrailController.handle(request, response)
})

trailsRoute.delete('/:id', (request, response) => {
    return deleteTrailController.handle(request, response)
})


module.exports = trailsRoute