const Address = require('../../../models/Address')
const Job = require('../../../models/Job')
const Contractor = require('../../../models/Contractor')

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

const contractorsResolver = async ({ id }) => {
  const job = await Job.query().findById(id)
  const contractors = await job.$relatedQuery('contractors')
  return contractors
}

const resolver = {
  Query: {
    getAllJobs,
  },
  Job: {
    address: addressResolver,
    filled: filledResolver,
    contractors: contractorsResolver,
  },
}

module.exports = resolver
