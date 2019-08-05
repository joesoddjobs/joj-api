const { HasManyRelation, HasOneRelation } = require('objection')
const BaseModel = require('./BaseModel')
const Job = require('./Job')
const Address = require('./Address')

class Customer extends BaseModel {
  static get tableName() {
    return 'customers'
  }

  static get relationMappings() {
    return {
      jobs: {
        relation: HasManyRelation,
        modelClass: Job,
        join: {
          from: 'customers.id',
          to: 'jobs.customerId',
        },
      },
      address: {
        relation: HasOneRelation,
        modelClass: Address,
        join: {
          from: 'customers.id',
          to: 'addresses.customerId',
        },
      },
    }
  }
}

module.exports = Customer
