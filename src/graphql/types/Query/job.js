const Address = require('../../../models/Address')
const Job = require('../../../models/Job')

const getAllJobs = async () => {
  const jobs = await Job.query().eager('contractors')
  return jobs
}

const addressResolver = async ({ id }) => {
  const address = await Address.query().findOne({
    jobId: id,
  })
  return address
}

const filledResolver = async ({ numberOfContractors, contractors }) => {
  return contractors.length >= numberOfContractors
}

const resolver = {
  Query: {
    getAllJobs,
  },
  Job: {
    address: addressResolver,
    filled: filledResolver,
  },
}

module.exports = resolver
