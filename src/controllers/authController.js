const { Router } = require('express')
const router = Router()

const jwt = require('jsonwebtoken')
const config = require('../config')
const verifyToken = require('./verifyToken')
const User = require('../models/User')

router.post('/signup', async (req, res, next) => {
  const { code, password, firstNames, parentalLastName, maternalLastName, email, city, phone, notes, role } = req.body
  const user = new User({
    code,
    password,
    firstNames,
    parentalLastName,
    maternalLastName,
    email,
    city,
    phone,
    notes,
    role
  })
  user.password = await user.encryptPassword(user.password)
  await user.save()
  const token = jwt.sign({ id: user._id }, config.secret, {
    expiresIn: 60 * 60 * 21
  })

  console.log(user)
  res.json({ auth: true, token })
})

router.post('/signin', async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email: email })
  if (!user) {
    return res.status(404).send("the email doesn't exist")
  }

  const validatePassword = await user.validatePassword(password)
  if (!validatePassword) {
    res.status(401).json({ auth: false, token: null })
  }

  const token = jwt.sign({ id: user._id }, config.secret, {
    expiresIn: 60 * 60 * 24
  })
  res.json({ auth: true, token })
})

router.get('/me', verifyToken, async (req, res, next) => {
  const user = await User.findById(req.userId, { password: 0 })
  if (!user) {
    return res.status(404).send('No user found')
  }

  res.json(user)
})

router.get('/api/users', verifyToken, async (req, res, next) => {
  const users = await User.find({}, { password: 0 })
  if (!users) {
    return res.status(404).send('No users found')
  }
  const { role } = req.body
  if (role !== 'admin') {
    return res.status(404).send('insufficient permissions')
  }

  res.json(users)
})

router.get('/signup', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.json({ message: error })
  }
})

module.exports = router
