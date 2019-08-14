const _ = require('lodash')
const { decodeToken } = require('../../../lib/tokens')
const Address = require('../../../models/Address')
const Job = require('../../../models/Job')

const createNewJob = async (obj, { input }, { token }) => {
  const newJobInput = _.pick(input, [
    'jobType',
    'numberOfContractors',
    'estimatedTime',
    'jobDescription',
    'firstChoiceDateTime',
    'secondChoiceDateTime',
    'address',
  ])

  // set customerId:
  const { id } = await decodeToken(token)
  newJobInput.customerId = id

  // if no new address was provided, use default user address:
  if (!input.address) {
    const address = await Address.query().findOne({
      customerId: id,
    })
    const addressObj = _.pick(address, [
      'city',
      'state',
      'postalCode',
      'street',
    ])
    newJobInput.address = addressObj
  }

  const newJob = await Job.query().insertGraphAndFetch(newJobInput)

  if (!newJob) {
    return {
      error: {
        message:
          'There was an error processing your job request. Please try again!',
      },
    }
  }

  console.log('new job', newJob)

  return {
    job: newJob,
  }
}

const resolver = {
  Mutation: {
    createNewJob,
  },
}

module.exports = resolver
