const express = require('express')
const router = express.Router()
const Report = require('../models/Report')
const verifyToken = require('./verifyToken')

router.post('/api/reports', verifyToken, async (req, res) => {
  try {
    const { filename, data, creationDate, lastModificationDate } = req.body

    Report.create({
      filename,
      data,
      creationDate,
      lastModificationDate
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

router.patch('/api/reports/:id', verifyToken, async (req, res) => {
  try {
    await Report.findByIdAndUpdate(req.params.id, req.body)
    res.json({ updated: true })
  } catch (error) {
    res.status(500).json({ updated: false })
  }
})

module.exports = router
