const register = require('./register')
const login = require('./login')
const home = require ('./home')
const calculator = require('./calculator')
const profile = require('./profile')
const controllers = {}


controllers.register = register
controllers.login = login
controllers.home = home
controllers.calculator = calculator
controllers.profile = profile

module.exports = controllers