const express = require('express')
const router = express.Router()
const verifyToken = require('./verifyToken')
const Notification = require('../models/Notification')

router.post('/api/notifications/add', verifyToken, async (req, res) => {
  const notification = new Notification({
    email: req.body.email,
    type: req.body.type,
    message: req.body.message
  })
  try {
    const savedNotif = await notification.save()
    res.json(savedNotif)
  } catch (error) {
    res.json({ message: error })
  }
})

router.get('/api/notifications/:email', verifyToken, async (req, res) => {
  try {
    const userNotifications = await Notification.find({ email: req.params.email }, {})
    res.json(userNotifications)
  } catch (error) {
    res.json({ message: error })
  }
})

router.delete('/api/notifications/:id', verifyToken, async (req, res) => {
  try {
    const removeNotification = await Notification.remove({ _id: req.params.id })
    res.json(removeNotification)
  } catch (error) {
    res.json({ message: error })
  }
})
module.exports = router
