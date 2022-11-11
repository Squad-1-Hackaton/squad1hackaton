const FindTrailService = require('./FindTrailService')
const FindTrailController = require('./FindTrailController')
const TrailRepository = require('../../repositories/TrailRepository')


const trailRepository = new TrailRepository()
const findTrailService = new  FindTrailService(trailRepository)
const findTrailController = new FindTrailController(findTrailService)

module.exports = findTrailController