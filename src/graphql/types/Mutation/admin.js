const Admin = require('../../../models/Admin')
const hashPassword = require('../../../lib/passwords/hashPassword')
const { createToken } = require('../../../lib/tokens')

const registerAdmin = async (obj, { email, password }) => {
  const existing = await Admin.query().findOne('email', email)
  if (existing) {
    return {
      error: { message: 'Account associated with this email already exists!' },
    }
  }

  const hash = await hashPassword(password)
  const registerInput = { email, password: hash }
  const admin = await Admin.query().insertGraphAndFetch(registerInput)

  if (!admin) {
    return {
      error: {
        message:
          'There was an error registering your information. Please try again!',
      },
    }
  }

  const token = createToken(admin.id, email)

  return {
    admin,
    token,
  }
}

const resolver = {
  Mutation: {
    registerAdmin,
  },
}

module.exports = resolver
