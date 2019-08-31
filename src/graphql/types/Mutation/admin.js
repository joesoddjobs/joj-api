const Admin = require('../../../models/Admin')
const Job = require('../../../models/Job')
const hashPassword = require('../../../lib/passwords/hashPassword')
const { createToken } = require('../../../lib/tokens')
const Contractor = require('../../../models/Contractor')
const { decodeToken } = require('../../../lib/tokens')

const registerAdmin = async (obj, { email, password }) => {
  const existing = await Admin.query().findOne('email', email)
  if (existing) {
    return {
      error: { message: 'Account associated with this email already exists!' },
    }
  }

  const hash = await hashPassword(password)
  const registerInput = { email, password: hash }
  const admin = await Admin.query().insertGraphAndFetch(registerInput)

  if (!admin) {
    return {
      error: {
        message:
          'There was an error registering your information. Please try again!',
      },
    }
  }

  const token = createToken(admin.id, email)

  return {
    admin,
    token,
  }
}

const deleteContractor = async (obj, { contractorId }, { token }) => {
  const { id } = await decodeToken(token)
  const admin = await Admin.query().findById(id)

  if (!admin) {
    return {
      error: {
        message: 'You are not authorised to complete this action.',
      },
    }
  }

  const deleteAction = await Contractor.query().deleteById(contractorId)
  if (!deleteAction) {
    return {
      error: {
        message: 'Failed to delete contractor, please try again.',
      },
    }
  }

  return { success: true }
}

const assignContractorToJob = async (
  obj,
  { contractorId, jobId },
  { token },
) => {
  const { id } = await decodeToken(token)
  const admin = await Admin.query()
    .skipUndefined()
    .findById(id)

  if (!admin) {
    return {
      error: {
        message: 'You are not authorised to complete this action.',
      },
    }
  }

  const job = await Job.query().findById(jobId)

  const updatedJob = await job.$relatedQuery('contractors').relate(contractorId)

  return { job: updatedJob }
}

const resolver = {
  Mutation: {
    registerAdmin,
    deleteContractor,
    assignContractorToJob,
  },
}

module.exports = resolver
