const _ = require('lodash')
const { decodeToken } = require('../../../lib/tokens')
const Address = require('../../../models/Address')
const Job = require('../../../models/Job')
const Customer = require('../../../models/Customer')
const Admin = require('../../../models/Admin')

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

  return {
    job: newJob,
  }
}

const deleteJob = async (obj, { jobId }, { token }) => {
  const { id } = await decodeToken(token)
  const admin = await Admin.query().findById(id)

  console.log('admin', admin)
  if (admin) {
    const deleteAction = await Job.query().deleteById(jobId)

    if (!deleteAction) {
      return {
        error: {
          message: 'Unable to delete job, please try again.',
        },
      }
    }
    return { success: true }
  }

  const customerJob = await Job.query()
    .findById(jobId)
    .where('customerId', id)
  console.log('JOB', customerJob)
  if (!customerJob) {
    return {
      error: {
        message: 'You are not authorized to delete this job!',
      },
    }
  }
  const deleted = await Job.query().deleteById(jobId)

  if (!deleted) {
    return {
      error: {
        message: 'Delete operation failed. Please try again.',
      },
    }
  }
  return { success: true }
}

const resolver = {
  Mutation: {
    deleteJob,
    createNewJob,
  },
}

module.exports = resolver
