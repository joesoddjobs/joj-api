const { HasManyRelation, HasOneRelation } = require('objection')
const BaseModel = require('./BaseModel')

class Contractor extends BaseModel {
  static get tableName() {
    return 'contractors'
  }

  static get relationMappings() {
    const Job = require('./Job')
    const Address = require('./Address')
    return {
      jobs: {
        relation: HasManyRelation,
        modelClass: Job,
        join: {
          from: 'contractors.id',
          through: {
            from: 'jobContractorRelations.contractorId',
            to: 'jobContractorRelations.jobId',
          },
          to: 'job.id',
        },
      },
      address: {
        relation: HasOneRelation,
        modelClass: Address,
        join: {
          from: 'contractors.id',
          to: 'addresses.contractorId',
        },
      },
    }
  }
}

module.exports = Contractor
