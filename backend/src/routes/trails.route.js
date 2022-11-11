const express = require("express");
// const findTrailController = require('../modules/trail/services/findTrail')
const findTrailController = require('../modules/trails/services/findTrails')
const trailsRoute = express.Router()


trailsRoute.get('/', (request, response) => {
    // return createUserController.handle(request, response)
    return response.send('Acessou!!')
})

trailsRoute.post('/', (request, response) => {
    return findTrailController.handle(request, response)
})

module.exports = trailsRoute