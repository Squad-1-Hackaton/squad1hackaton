const FinAllContentsByTrailService = require('./FinAllContentsByTrailService')
const FinAllContentsByTrailController = require('./FinAllContentsByTrailController')
const TrailRepository = require('../../repositories/TrailRepository')


const trailRepository = new TrailRepository()
const finAllContentsByTrailService = new  FinAllContentsByTrailService(trailRepository)
const finAllContentsByTrailController = new FinAllContentsByTrailController(finAllContentsByTrailService)

module.exports = finAllContentsByTrailController