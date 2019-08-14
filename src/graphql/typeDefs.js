const gql = require('graphql-tag')

module.exports = gql`
  type Query {
    # customer queries:
    isValidCustomerEmail(email: String!): Boolean!
    currentCustomer: CustomerReturn!

    # contractor queries:
    isValidContractorEmail(email: String!): Boolean!
    currentContractor: ContractorReturn!

    # job queries:
    getAllJobs: [Job]!
    getAllOpenJobs: [Job]!
  }

  type ContractorReturn {
    contractor: Contractor!
    error: Error
  }

  type CustomerReturn {
    customer: Customer!
    error: Error
  }

  type Mutation {
    # customer mutations:
    loginCustomer(email: String!, password: String!): CustomerLoginReturn!
    registerCustomer(input: CustomerRegisterInput!): CustomerRegisterReturn!
    createNewJob(input: NewJobInput!): NewJobReturn!

    # contractor mutations:
    registerContractor(
      input: ContractorRegisterInput!
    ): ContractorRegisterReturn!
    loginContractor(email: String!, password: String!): ContractorLoginReturn!
  }

  input NewJobInput {
    jobType: JobType!
    numberOfContractors: Int!
    estimatedTime: Int!
    jobDescription: String!
    firstChoiceDateTime: String!
    secondChoiceDateTime: String!
    address: AddressInput
  }

  type NewJobReturn {
    job: Job!
    error: Error
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
    address: AddressInput
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
    jobs: [Job]
    phoneNumber: String!
    address: Address
    income: Income
    age: String!
  }

  type Customer {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    address: Address!
    phoneNumber: String!
    jobs: [Job]
    recentJobs: [Job]
    activeJobs: [Job]
    completedJobs: [Job]
  }

  type Income {
    yearToDate: Float!
    total: Float!
  }

  type Job {
    id: ID!
    customer: Customer
    status: Status!
    contractors: [Contractor]
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
    filled: Boolean!
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
