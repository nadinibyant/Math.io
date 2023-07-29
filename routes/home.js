const express = require('express')
const router = express.Router()

const controllers = require('../controllers/home')

router.get('/home', controllers.viewHome)
router.get('/username', controllers.getUsername)
router.get('/documentation', controllers.getViewDoc)

module.exports = router