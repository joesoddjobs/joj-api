const { ManyToManyRelation, HasOneRelation } = require('objection')
const BaseModel = require('./BaseModel')

class Job extends BaseModel {
  static get tableName() {
    return 'jobs'
  }

  static get relationMappings() {
    const Customer = require('./Customer')
    const Address = require('./Address')
    const Contractor = require('./Contractor')

    return {
      customer: {
        relation: HasOneRelation,
        modelClass: Customer,
        join: {
          from: 'jobs.customerId',
          to: 'customers.id',
        },
      },
      address: {
        relation: HasOneRelation,
        modelClass: Address,
        join: {
          from: 'jobs.id',
          to: 'addresses.jobId',
        },
      },
      contractors: {
        relation: ManyToManyRelation,
        modelClass: Contractor,
        join: {
          from: 'jobs.id',
          through: {
            from: 'jobContractorRelations.jobId',
            to: 'jobContractorRelations.contractorId',
          },
          to: 'contractors.id',
        },
      },
    }
  }
}

module.exports = Job
