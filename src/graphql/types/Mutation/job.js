const _ = require('lodash')
const { decodeToken } = require('../../../lib/tokens')
const Address = require('../../../models/Address')
const Job = require('../../../models/Job')
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

const markJobCompleted = async (obj, { jobId, actualTime }, { token }) => {
  const { id } = await decodeToken(token)
  const admin = await Admin.query().findById(id)
  if (!admin) {
    return {
      error: {
        message: 'You are not authorised to complete this action.',
      },
    }
  }
  const completedJob = Job.query().patchAndFetchById(jobId, {
    status: 'COMPLETED',
    actualTime,
  })

  if (!completedJob) {
    return {
      error: {
        message: 'Failed to update job, please try again.',
      },
    }
  }
  return { job: completedJob }
}

const markJobPaid = async (obj, { jobId }, { token }) => {
  const { id } = await decodeToken(token)
  const admin = await Admin.query().findById(id)
  if (!admin) {
    return {
      error: {
        message: 'You are not authorised to complete this action.',
      },
    }
  }
  const paidJob = Job.query().patchAndFetchById(jobId, {
    status: 'PAID',
  })

  if (!paidJob) {
    return {
      error: {
        message: 'Failed to update job, please try again.',
      },
    }
  }
  return { job: paidJob }
}

const scheduleJob = async (obj, { jobId, scheduledDateTime }, { token }) => {
  const { id } = await decodeToken(token)
  const admin = await Admin.query().findById(id)
  if (!admin) {
    return {
      error: {
        message: 'You are not authorised to complete this action.',
      },
    }
  }

  const scheduledJob = Job.query().patchAndFetchById(jobId, {
    scheduledDateTime,
  })

  if (!scheduledJob) {
    return {
      error: {
        message: 'Failed to update job, please try again.',
      },
    }
  }
}

const resolver = {
  Mutation: {
    deleteJob,
    createNewJob,
    markJobCompleted,
    markJobPaid,
    scheduleJob,
  },
}

module.exports = resolver
