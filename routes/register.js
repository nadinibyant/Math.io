const express = require('express')
const router = express.Router()
const controllers = require("../controllers/index");

router.get('/', (req,res) => {
    res.render('index')
})
router.post('/register', controllers.register.register)
router.get('/register', (req,res) => {
    res.render('register')
})

module.exports = router