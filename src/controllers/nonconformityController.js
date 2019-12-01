const express = require('express')
const router = express.Router()
const Nonconformity = require('../models/Nonconformity')
const verifyToken = require('./verifyToken')

router.get('/api/nonconformities', verifyToken, async (req, res) => {
  try {
    const nonconformities = await Nonconformity.find()

    if (!nonconformities) {
      return res.status(404).send('No nonconformities found')
    }

    res.json(nonconformities)
  } catch (error) {
    res.json({ message: error })
  }
})

router.post('/api/nonconformities', verifyToken, async (req, res) => {
  try {
    const { text, type } = req.body

    Nonconformity.create({
      text,
      type
    }, (err, room) => {
      if (err) {
        console.log(err)
        res.status(500).json({ created: false })
      } else {
        res.json({ created: true, id: room.id })
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ created: false })
  }
})

router.put('/api/nonconformities/:id', verifyToken, async (req, res) => {
  try {
    await Nonconformity.findByIdAndUpdate(req.params.id, req.body)
    res.json({ updated: true })
  } catch (error) {
    res.status(500).json({ updated: false })
  }
})

router.delete('/api/nonconformities/:id', verifyToken, async (req, res) => {
  try {
    await Nonconformity.findByIdAndDelete(req.params.id)
    res.json({ deleted: true })
  } catch (error) {
    res.status(500).json({ deleted: false })
  }
})

module.exports = router
