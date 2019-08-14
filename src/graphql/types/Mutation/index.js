const merge = require('lodash.merge')
const contractor = require('./contractor')
const customer = require('./customer')
const job = require('./job')
const auth = require('./auth')

const resolvers = [contractor, customer, auth, job]

module.exports = merge(...resolvers)
