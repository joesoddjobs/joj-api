const { decodeToken } = require('../../../lib/tokens')
const Contractor = require('../../../models/Contractor')
const Customer = require('../../../models/Customer')

// get current customer by decoding token in context:
const customerResolver = async (_obj, _args, { token }) => {
  const { id } = await decodeToken(token)
  console.log('CURRENT ID', id)
  const currentCustomer = await Customer.query().findById(id)
  console.log('current cust', currentCustomer)
  if (!currentCustomer) {
    return {
      error: {
        message: 'Could not find this contractor',
      },
    }
  }
  return {
    customer: currentCustomer,
  }
}

// get current contractor by decoding token in context:
const contractorResolver = async (_obj, _args, { token }) => {
  const { id } = await decodeToken(token)
  const currentContractor = await Contractor.query().findById(id)
  if (!currentContractor) {
    return {
      error: {
        message: 'Could not find this contractor',
      },
    }
  }
  return {
    contractor: currentContractor,
  }
}

const resolver = {
  Query: {
    currentCustomer: customerResolver,
    currentContractor: contractorResolver,
  },
}

module.exports = resolver
