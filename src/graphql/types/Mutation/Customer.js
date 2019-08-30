const _ = require('lodash')
const { transaction } = require('objection')
const { createToken, decodeToken } = require('../../../lib/tokens')
const Customer = require('../../../models/Customer')
const hashPassword = require('../../../lib/passwords/hashPassword')

const editCustomer = async (obj, { input }, { token }) => {
  const editInput = _.pick(input, [
    'firstName',
    'lastName',
    'phoneNumber',
    'email',
  ])

  const { id } = await decodeToken(token)

  if (!id) {
    return {
      error: {
        message: 'User not found.',
      },
    }
  }

  const knex = Customer.knex()

  try {
    const insertTransaction = await transaction(knex, async trx => {
      const updatedUser = await Customer.query(trx).patchAndFetchById(
        id,
        editInput,
      )

      return {
        customer: updatedUser,
      }
    })
    return insertTransaction
  } catch (err) {
    return {
      error: {
        message: 'Something went wrong. Customer not updated.',
      },
    }
  }
}

const registerCustomer = async (obj, { input }) => {
  const registerInput = _.pick(input, [
    'firstName',
    'lastName',
    'email',
    'phoneNumber',
    'address',
  ])

  // check for existing user:
  const existing = await Customer.query().findOne('email', input.email)
  if (existing) {
    return {
      error: { message: 'Account associated with this email already exists!' },
    }
  }

  const hash = await hashPassword(input.password)

  // insert hash into registerInput:
  registerInput.password = hash

  const customer = await Customer.query().insertGraphAndFetch(registerInput)

  if (!customer) {
    return {
      error: {
        message:
          'There was an error registering your information. Please try again!',
      },
    }
  }

  // create token with create token function:
  const token = createToken(customer.id, input.email)

  return {
    customer,
    token,
  }
}

const resolver = {
  Mutation: {
    registerCustomer,
    editCustomer,
  },
}

module.exports = resolver
