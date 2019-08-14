const Customer = require('../../../models/Customer')
const Address = require('../../../models/Address')
const Job = require('../../../models/Job')

const isValidCustomerEmail = async (obj, { email }) => {
  const user = await Customer.query().findOne('email', email)
  return !user
}

const addressResolver = async ({ id }) => {
  const address = await Address.query().findOne({
    customerId: id,
  })
  return address
}

const jobsResolver = async ({ id }) => {
  const jobs = await Job.query().where('customerId', id)
  return jobs
}

const activeJobsResolver = async ({ id }) => {
  const activeJobs = await Job.query()
    .where('customerId', id)
    .andWhere('status', 'OPEN')
    .orWhere('status', 'CLAIMED')
  return activeJobs
}

const completedJobsResolver = async ({ id }) => {
  const completedJobs = await Job.query()
    .where('customerId', id)
    .andWhere('status', 'COMPLETED')
    .orWhere('status', 'PAID')
  return completedJobs
}

const recentJobsResolver = async ({ id }) => {
  const recentJobs = await Job.query()
    .where('customerId', id)
    .limit(5)
  return recentJobs
}

const resolver = {
  Query: {
    isValidCustomerEmail,
  },
  Customer: {
    activeJobs: activeJobsResolver,
    completedJobs: completedJobsResolver,
    recentJobs: recentJobsResolver,
    address: addressResolver,
    jobs: jobsResolver,
  },
}

module.exports = resolver
