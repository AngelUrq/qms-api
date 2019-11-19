const jwt = require('jsonwebtoken')
const config = require('../config')

function verifyToken (req, res, next) {
  try {
    const token = req.headers['x-access-token']
    console.log('verificando token ...')
    if (!token) {
      return res.status(401).json({
        auth: false,
        message: 'no token provived'
      })
    }
    const decoded = jwt.verify(token, config.secret)

    req.userId = decoded.id
    next()
  } catch (error) {
    return res.status(401).json({
      auth: false,
      message: 'invalid token'
    })
  }
}

module.exports = verifyToken
