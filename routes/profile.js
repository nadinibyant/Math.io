const express = require('express')
const router = express.Router()
const controllers = require('../controllers/profile')

router.get('/profile', controllers.getViewsProfile)
router.get('/dataProfile', controllers.getDataProfile)
router.post('/editProfile', controllers.editProfile)
router.post('/logout', controllers.logout)

module.exports = router