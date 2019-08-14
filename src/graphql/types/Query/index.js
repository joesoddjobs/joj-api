const merge = require('lodash.merge')
const currentViewer = require('./currentViewer')
const contractor = require('./contractor')
const customer = require('./customer')
const job = require('./job')

const resolvers = [job, currentViewer, contractor, customer]

module.exports = merge(...resolvers)
