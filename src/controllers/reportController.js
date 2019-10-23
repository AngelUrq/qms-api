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
    })

    res.json({ created: true })
  } catch (error) {
    console.log(error)
    res.json({ created: false })
  }
})

module.exports = router
