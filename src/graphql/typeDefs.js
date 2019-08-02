const gql = require('graphql-tag')

module.exports = gql`
  type Address {
    street: String!
    city: String!
    state: String!
    postalCode: String!
  }

  type Contractor {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    jobs: [ContractorJob]
    phoneNumber: String!
    address: Address!
    income: Income
    birthDate: String!
  }

  type ContractorJob @model(queries: null) {
    id: ID!
    contractor: Contractor!
    job: Job!
  }

  type Customer @model {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    jobs: [Job]
    phoneNumber: String!
  }

  type Income {
    yearToDate: Float!
    total: Float!
  }

  type Job @model {
    id: ID!
    customer: Customer
    status: Status!
    contractors: [ContractorJob]
    address: Address!
    jobType: JobType!
    numberOfContractors: Int!
    estimatedTime: Int!
    actualTime: Float
    jobDescription: String!
    firstChoiceDateTime: String!
    secondChoiceDateTime: String!
    scheduledDateTime: String!
    rate: Float!
  }

  enum JobType {
    LANDSCAPING
    LAWN_MOWING
    MOVING
    FURNITURE_ASSEMBLY
    POWER_WASHING
    PAINTING
    CLEANING
    OTHER
  }

  enum Status {
    CLAIMED
    OPEN
    COMPLETED
    PAID
  }
`
