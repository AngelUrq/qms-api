const express = require('express')
const router = express.Router()

const config = require('../config')
const verifyToken = require('./verifyToken')
const User = require('../models/ReportFormat')

router.get('/api/report-format', verifyToken, (req, res) => {
  res.send('Hi report format')
})

module.exports = router
