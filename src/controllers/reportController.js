const express = require('express')
const router = express.Router()

const config = require('../config')
const verifyToken = require('./verifyToken')
const User = require('../models/Report')

router.get('/api/report-format', verifyToken, (req, res) => {
  res.send('Holaaa reporte')
})

module.exports = router
