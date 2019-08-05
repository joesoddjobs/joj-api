module.exports.verifyUser = user => {
  if (!user) {
    return {
      success: false,
      error: {
        message: 'This user is not currently logged in',
      },
    }
  }

  if (user.banned) {
    return {
      success: false,
      error: {
        message: 'This account is banned',
      },
    }
  }

  return false
}
