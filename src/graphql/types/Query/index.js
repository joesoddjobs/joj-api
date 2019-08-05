const merge = require('lodash.merge')
const currentViewer = require('./currentViewer')

const resolvers = [currentViewer]

module.exports = merge(...resolvers)
