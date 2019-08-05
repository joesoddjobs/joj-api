const moment = require('moment')
const randomize = require('randomatic')
const Customer = require('../../../models/Customer')
const Contractor = require('../../../models/Contractor')
const config = require('../../../config')
const comparePasswords = require('../../../lib/passwords/comparePasswords')
const { createToken } = require('../../../lib/tokens')
const { verifyUser } = require('../../helpers/auth')
const hashPassword = require('../../../lib/passwords/hashPassword')

const MINUTES_PER_HOUR = 60

// login the user, comparing the hashes:
const loginCustomer = async (obj, { email, password }) => {
  const user = await Customer.query().findOne('email', email)
  if (!user) {
    return {
      error: {
        message: "The email you entered doesn't belong to an existing account",
      },
    }
  }

  const verificationError = verifyUser(user)
  if (verificationError) return verificationError

  const valid = await comparePasswords(password, user.password)

  if (!valid) {
    return {
      error: { message: 'Invalid password' },
    }
  }

  const token = createToken(user.id, email)

  return {
    customer: user,
    token,
  }
}

const loginContractor = async (obj, { email, password }) => {
  const user = await Contractor.query().findOne('email', email)
  if (!user) {
    return {
      error: {
        message: "The email you entered doesn't belong to an existing account",
      },
    }
  }

  const verificationError = verifyUser(user)
  if (verificationError) return verificationError

  const valid = await comparePasswords(password, user.password)

  if (!valid) {
    return {
      error: { message: 'Invalid password' },
    }
  }

  const token = createToken(user.id, email)

  return {
    contractor: user,
    token,
  }
}

const resolver = {
  Mutation: { loginCustomer, loginContractor },
}

module.exports = resolver
