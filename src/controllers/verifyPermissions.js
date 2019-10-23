const User = require('../models/User')
const allowedRole = require('../utils/data')

async function verifyPermissions (emailOrCode) {
  var userRole = await User.findOne({ email: emailOrCode })
  if (!userRole) {
    userRole = await User.findOne({ code: emailOrCode })
  }
  return userRole === allowedRole
}

module.exports = verifyPermissions
