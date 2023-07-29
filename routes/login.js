const express = require('express')
const router = express.Router()

const controllers = require('../controllers/login')

router.post('/login', controllers.login)
router.get('/login', (req,res) => {
    res.render('login')
})

module.exports = router