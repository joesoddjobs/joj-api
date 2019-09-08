const { HasOneRelation, HasManyRelation } = require('objection')
const BaseModel = require('./BaseModel')

class JobContractorRelations extends BaseModel {
  static get tableName() {
    return 'jobContractorRelations'
  }

  static get relationMappings() {
    const Contractor = require('./Contractor')
    const Job = require('./Job')

    return {
      contractors: {
        relation: HasManyRelation,
        modelClass: Contractor,
        join: {
          from: 'jobsContractorRelations.contractorId',
          to: 'contractors.id',
        },
      },
      job: {
        relation: HasOneRelation,
        modelClass: Job,
        join: {
          from: 'jobsContractorRelations.jobId',
          to: 'jobs.id',
        },
      },
    }
  }
}

module.exports = JobContractorRelations
