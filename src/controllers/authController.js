const { Router } = require('express')
const router = Router()

const jwt = require('jsonwebtoken')
const config = require('../config')
const verifyToken = require('./verifyToken')
const User = require('../models/User')

router.post('/api/users/signup', async (req, res, next) => {
  const { code, password, firstNames, paternalLastName, maternalLastName, email, city, phone, notes, role } = req.body

  const user = new User({
    code,
    password,
    firstNames,
    paternalLastName,
    maternalLastName,
    email,
    city,
    phone,
    notes,
    role
  })

  user.password = await user.encryptPassword(user.password)
  await user.save()

  res.json({ auth: true })
})

router.post('/api/users/signin', async (req, res, next) => {
  const { email, code, password } = req.body
  const userEmail = await User.findOne({ email: email })
  const userCode = await User.findOne({ code: code })

  if (!userEmail && !userCode) {
    return res.status(404).send("user doesn't exist")
  }

  var user = userEmail

  if (!userEmail) {
    user = userCode
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

router.post('/api/users/isLogged', verifyToken, async (req, res, next) => {
  try {
    res.json({ auth: true })
  } catch (error) {
    res.json({ message: error })
  }
})

router.get('/api/users', verifyToken, async (req, res, next) => {
  const users = await User.find({}, { password: 0 })
  try {
    if (!users) {
      return res.status(404).send('No users found')
    }
    res.json(users)
  } catch (error) {
    res.json({ message: error })
  }

  res.json(users)
})

router.delete('/api/users/:id', verifyToken, async (req, res) => {
  try {
    const removeUser = await User.remove({ _id: req.params.id })
    res.json(removeUser)
  } catch (error) {
    res.json({ message: error })
  }
})

router.patch('/api/users/:id', verifyToken, async (req, res) => {
  try {
    const updateUserInfo = await User.updateOne({ _id: req.params.id },
      {
        $set: {
          code: req.body.code,
          firstNames: req.body.firstNames,
          paternalLastName: req.body.paternalLastName,
          maternalLastName: req.body.maternalLastName,
          email: req.body.email,
          city: req.body.city,
          phone: req.body.phone,
          notes: req.body.notes,
          role: req.body.role
        }
      }
    )
    res.json(updateUserInfo)
  } catch (error) {
    res.json({ message: error })
  }
})

module.exports = router
