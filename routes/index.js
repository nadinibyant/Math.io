const register = require('./register')
const login = require('./login')
const home = require('./home')
const calculator = require('./calculator')
const profile = require('./profile')

const server = {}
server.register = register
server.login = login
server.home = home
server.calculator = calculator
server.profile = profile

module.exports = server