const { Router } = require('express')
const router = Router()

const jwt = require('jsonwebtoken')
const config = require('../config')
const verifyToken = require('./verifyToken')
const User = require('../models/User')

router.post('/api/users/signup', async (req, res) => {
  try {
    const { code, password, firstNames, paternalLastName, maternalLastName, email, city, phone, notes, role, lastLogIn } = req.body
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
      role,
      lastLogIn
    })

    user.password = await user.encryptPassword(user.password)
    await user.save()

    res.json({ auth: true })
  } catch (error) {
    console.log(error)
    res.json({ message: error })
  }
})

router.post('/api/users/signin', async (req, res) => {
  try {
    const { email, code, password } = req.body
    const userByEmail = await User.findOne({ email: email })
    const userByCode = await User.findOne({ code: code })

    if (!userByEmail && !userByCode) {
      return res.status(404).send("user doesn't exist")
    }

    var user = userByEmail

    if (!userByEmail) {
      user = userByCode
    }

    const validatePassword = await user.validatePassword(password)
    if (!validatePassword) {
      res.status(401).json({ auth: false, token: null, message: 'invalid password' })
    }

    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 60 * 60 * 24
    })
    res.json({ auth: true, token, role: user.role })
  } catch (error) {
    console.log(error)
    res.json({ message: error })
  }
})

router.post('/api/users/isLogged', verifyToken, async (req, res, next) => {
  try {
    res.json({ auth: true })
  } catch (error) {
    res.json({ message: error })
  }
})

router.get('/api/users', verifyToken, async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 })
    if (!users) {
      return res.status(404).send('No users found')
    }
    res.json(users)
  } catch (error) {
    res.json({ message: error })
  }
})

router.get('/api/users/:id', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).send('No user found')
    }

    res.json(user)
  } catch (error) {
    res.json({ message: error })
  }
})

router.get('/api/users/token/:token', verifyToken, async (req, res, next) => {
  try {
    const token = req.params.token
    if (!token) {
      return res.status(401).json({
        message: 'no token provived'
      })
    }
    const decoded = jwt.verify(token, config.secret)

    const userId = decoded.id
    try {
      const user = await User.findById(userId)
      res.json(user)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  } catch (error) {
    return res.status(401).json({
      message: 'invalid token'
    })
  }
})

router.delete('/api/users/:id', verifyToken, async (req, res) => {
  try {
    const removeUser = await User.remove({ _id: req.params.id })
    res.json(removeUser)
  } catch (error) {
    res.json({ message: error })
  }
})

router.put('/api/users/:id', verifyToken, async (req, res) => {
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
          role: req.body.role,
          lastLogIn: req.body.lastLogIn
        }
      }
    )
    res.json(updateUserInfo)
  } catch (error) {
    res.json({ message: error })
  }
})

router.put('/api/users/log-time/:userID', async (req, res) => {
  try {
    const logTime = await User.findOneAndUpdate({ _id: req.params.userID }, req.body)
    res.json(logTime)
  } catch (error) {
    res.json({ message: error })
  }
})

router.put('/api/password-reset/:email', async (req, res) => {
  try {
    const userEmail = await User.findOne({ email: req.params.email })
    if (!userEmail) {
      return res.status(404).send("user doesn't exist")
    } else {
      const { password } = req.body
      const user = new User({
        password
      })
      user.password = await user.encryptPassword(user.password)
      console.log(user.password)
      const updateUserPass = await User.updateOne({ email: req.params.email }, { $set: { password: user.password } })
      res.json(updateUserPass)
    }
  } catch (error) {
    res.json({ message: error })
  }
})
module.exports = router
