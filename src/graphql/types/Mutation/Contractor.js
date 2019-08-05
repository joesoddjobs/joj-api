const _ = require('lodash')
const Contractor = require('../../../models/Contractor')
const hashPassword = require('../../../lib/passwords/hashPassword')
const { createToken } = require('../../../lib/tokens')

const registerContractor = async (obj, { input }) => {
  const registerInput = _.pick(input, [
    'firstName',
    'lastName',
    'email',
    'phoneNumber',
    'birthDate',
    'address',
  ])

  // check for existing user:
  const existing = await Contractor.query().findOne('email', input.email)
  if (existing) {
    return {
      error: { message: 'Account associated with this email already exists!' },
    }
  }

  const hash = await hashPassword(input.password)

  // insert hash into registerInput:
  registerInput.password = hash

  const contractor = await Contractor.query().insertGraphAndFetch(registerInput)

  if (!contractor) {
    return {
      error: {
        message:
          'There was an error registering your information. Please try again!',
      },
    }
  }

  // create token with create token function:
  const token = createToken(contractor.id, input.email)

  return {
    contractor,
    token,
  }
}

const resolver = {
  Mutation: {
    registerContractor,
  },
}

module.exports = resolver
