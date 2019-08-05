const gql = require('graphql-tag')

module.exports = gql`
  type Query {
    isValidEmail(email: String!): Boolean!
    currentContractor: ContractorReturn!
    currentCustomer: CustomerReturn!
  }

  type ContractorReturn {
    contractor: Contractor!
    error: Error
  }

  type CustomerReturn {
    contractor: Customer!
    error: Error
  }

  type Mutation {
    registerCustomer(input: CustomerRegisterInput!): CustomerRegisterReturn!
    registerContractor(
      input: ContractorRegisterInput!
    ): ContractorRegisterReturn!
    loginCustomer(email: String!, password: String!): CustomerLoginReturn!
    loginContractor(email: String!, password: String!): ContractorLoginReturn!
  }

  type CustomerLoginReturn {
    customer: Customer!
    token: String!
    error: Error
  }

  type ContractorLoginReturn {
    contractor: Contractor!
    token: String!
    error: Error
  }

  input CustomerRegisterInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    phoneNumber: String!
    address: AddressInput!
  }

  type CustomerRegisterReturn {
    customer: Customer!
    error: Error
    token: String!
  }

  input ContractorRegisterInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    phoneNumber: String!
    address: AddressInput!
    birthDate: String!
  }

  type ContractorRegisterReturn {
    contractor: Contractor!
    error: Error
    token: String!
  }

  type Address {
    street: String!
    city: String!
    state: String!
    postalCode: String!
  }

  input AddressInput {
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

  type ContractorJob {
    id: ID!
    contractor: Contractor!
    job: Job!
  }

  type Customer {
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

  type Job {
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

  type Error {
    message: String
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
