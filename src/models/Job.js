const { HasManyRelation, HasOneRelation } = require('objection')
const BaseModel = require('./BaseModel')
const Customer = require('./Customer')
const Address = require('./Address')
const Contractor = require('./Contractor')

class Job extends BaseModel {
  static get tableName() {
    return 'contractors'
  }

  static get relationMappings() {
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
        relation: HasManyRelation,
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
