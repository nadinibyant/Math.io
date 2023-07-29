const express = require('express')
const router = express.Router()
const controllers = require('../controllers/calculator')

router.get('/calculator', controllers.getViewCalculator)
router.post('/calculate', controllers.calculate)
router.get('/dataCal', controllers.getDataCalculate)

module.exports = router