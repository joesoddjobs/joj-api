const merge = require('lodash.merge')
const contractor = require('./Contractor')
const customer = require('./Customer')
const auth = require('./Auth')

const resolvers = [contractor, customer, auth]

module.exports = merge(...resolvers)
