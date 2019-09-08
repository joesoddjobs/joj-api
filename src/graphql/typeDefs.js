const gql = require('graphql-tag')

module.exports = gql`
  type Query {
    # customer queries:
    isValidCustomerEmail(email: String!): Boolean!
    currentCustomer: CustomerReturn!
    getAllCustomers: [Customer]

    # contractor queries:
    isValidContractorEmail(email: String!): Boolean!
    currentContractor: ContractorReturn!
    getAllContractors: [Contractor]

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
    editCustomer(input: EditCustomerInput!): EditCustomerReturn!
    deleteJob(jobId: ID!): DeleteReturn!

    # contractor mutations:
    registerContractor(
      input: ContractorRegisterInput!
    ): ContractorRegisterReturn!
    loginContractor(email: String!, password: String!): ContractorLoginReturn!

    # admin mutations:
    loginAdmin(email: String!, password: String!): AdminLoginReturn!
    registerAdmin(email: String!, password: String!): AdminRegisterReturn!

    markJobCompleted(jobId: ID!, actualTime: Int!): markJobReturn!
    markJobPaid(jobId: ID!): markJobReturn!
    deleteContractor(contractorId: ID!): DeleteReturn!
    assignContractorToJob(
      contractorId: ID!
      jobId: ID!
    ): AssignContractorReturn!
    removeContractorFromJob(
      contractorId: ID!
      jobId: ID!
    ): AssignContractorReturn!
  }

  type DeleteReturn {
    success: Boolean
    error: Error
  }

  type AssignContractorReturn {
    job: Job!
    error: Error
  }

  type markJobReturn {
    job: Job!
    error: Error
  }

  input EditCustomerInput {
    firstName: String
    lastName: String
    phoneNumber: String
    email: String
  }

  type EditCustomerReturn {
    customer: Customer!
    error: Error
  }

  type AdminLoginReturn {
    admin: Admin!
    token: String!
    error: Error
  }

  type AdminRegisterReturn {
    admin: Admin!
    token: String!
    error: Error
  }

  type Admin {
    id: ID!
    email: String!
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
    customerId: String!
    customer: Customer!
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
    scheduledDateTime: String
    rate: Float!
    filled: Boolean!
  }

  type Error {
    message: String
  }

  enum JobType {
    LANDSCAPING
    LAWNMOWING
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
