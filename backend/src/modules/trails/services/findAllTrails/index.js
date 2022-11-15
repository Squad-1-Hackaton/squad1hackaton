const FindAllTrailService = require('./FindAllTrailService')
const FindAllTrailController = require('./FindAllTrailController')
const TrailRepository = require('../../repositories/TrailRepository')


const trailRepository = new TrailRepository()
const findAllTrailService = new  FindAllTrailService(trailRepository)
const findAllTrailController = new FindAllTrailController(findAllTrailService)

module.exports = findAllTrailController