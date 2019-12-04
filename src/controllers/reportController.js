const express = require('express')
const router = express.Router()
const Report = require('../models/Report')
const verifyToken = require('./verifyToken')

router.get('/api/reports', verifyToken, async (req, res) => {
  try {
    const reports = await Report.find()

    if (!reports) {
      return res.status(404).send('No reports found')
    }

    res.json(reports)
  } catch (error) {
    res.json({ message: error })
  }
})

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

router.put('/api/reports/:id', verifyToken, async (req, res) => {
  try {
    await Report.findByIdAndUpdate(req.params.id, req.body)
    res.json({ updated: true })
  } catch (error) {
    res.status(500).json({ updated: false })
  }
})

router.delete('/api/reports/:id', verifyToken, async (req, res) => {
  try {
    await Report.findByIdAndDelete(req.params.id)
    res.json({ deleted: true })
  } catch (error) {
    res.status(500).json({ deleted: false })
  }
})

module.exports = router
