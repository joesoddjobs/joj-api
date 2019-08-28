const merge = require('lodash.merge')
const contractor = require('./contractor')
const customer = require('./customer')
const job = require('./job')
const auth = require('./auth')
const admin = require('./admin')

const resolvers = [contractor, customer, auth, job, admin]

module.exports = merge(...resolvers)
