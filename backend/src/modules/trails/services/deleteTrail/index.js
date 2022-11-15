const DeleteTrailService = require('./DeleteTrailService')
const DeleteTrailController = require('./DeleteTrailController')
const TrailRepository = require('../../repositories/TrailRepository')


const trailRepository = new TrailRepository()
const deleteTrailService = new  DeleteTrailService(trailRepository)
const deleteTrailController = new DeleteTrailController(deleteTrailService)

module.exports = deleteTrailController