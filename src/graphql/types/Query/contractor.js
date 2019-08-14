const moment = require('moment')
const Contractor = require('../../../models/Contractor')
const Address = require('../../../models/Address')
const Job = require('../../../models/Job')

const isValidContractorEmailResolver = async (obj, { email }) => {
  const user = await Contractor.query().findOne('email', email)
  return !user
}

const addressResolver = async ({ id }) => {
  const address = await Address.query().findOne({
    contractorId: id,
  })
  return address
}

const jobsResolver = async ({ id }) => {
  const jobs = await Job.query()
    .eager('contractors')
    .modifyEager('contractors', builder => {
      builder.where('contractorId', id)
    })
  return jobs
}

const incomeResolver = async ({ id }) => {
  const jobs = await Job.query()
    .eager('contractors')
    .modifyEager('contractors', builder => {
      builder.where('contractorId', id)
    })

  const reducer = (acc, job) => acc + job.actualTime * job.rate
  const total = jobs.reduce(reducer, 0)

  // TODO: decide on yearToDate:
  return { yearToDate: 5, total }
}

const ageResolver = async ({ id }) => {
  const { birthDate } = await Contractor.query()
    .findById(id)
    .select('birthDate')
  const age = moment().diff(moment(birthDate), 'years')

  return age
}

const resolver = {
  Query: {
    isValidContractorEmail: isValidContractorEmailResolver,
  },
  Contractor: {
    jobs: jobsResolver,
    address: addressResolver,
    age: ageResolver,
    income: incomeResolver,
  },
}

module.exports = resolver
