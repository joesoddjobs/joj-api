const customerResolver = async (_obj, _args, { customer }) => {
  if (!customer) {
    return {
      error: {
        message: 'Could not find this customer',
      },
    }
  }
  return {
    customer,
  }
}

const contractorResolver = async (_obj, _args, { contractor }) => {
  if (!contractor) {
    return {
      error: {
        message: 'Could not find this contractor',
      },
    }
  }
  return {
    contractor,
  }
}

const resolver = {
  Query: {
    currentCustomer: customerResolver,
    currentContractor: contractorResolver,
  },
}

module.exports = resolver
