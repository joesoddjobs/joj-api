const { HasManyRelation, HasOneRelation } = require('objection')
const BaseModel = require('./BaseModel')
const Job = require('./Job')
const Address = require('./Address')

class Contractor extends BaseModel {
  static get tableName() {
    return 'contractors'
  }

  static get relationMappings() {
    return {
      jobs: {
        relation: HasManyRelation,
        modelClass: Job,
        join: {
          from: 'contractors.id',
          to: 'jobs.contractorId',
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
