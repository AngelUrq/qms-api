const { Router } = require('express')
const router = Router()

const verifyToken = require('./verifyToken')
const ReportFormat = require('../models/ReportFormat')

router.post('/api/report-format', verifyToken, (req, res, next) => {
  try {
    const { name, version, creationDate, lastModificationDate, title, subtitles } = req.body
    ReportFormat.create({
      name,
      version,
      creationDate,
      lastModificationDate,
      title,
      subtitles
    })
    res.send('Report format created successfully')
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/api/report-format', verifyToken, async (req, res) => {
  try {
    const reportFormats = await ReportFormat.find()
    res.json(reportFormats)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.put('/api/report-format/:id', verifyToken, async (req, res) => {
  try {
    await ReportFormat.findByIdAndUpdate(req.params.id, req.body)
    res.json({ status: 'Report format updated' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.delete('/api/report-format/:id', verifyToken, async (req, res, next) => {
  try {
    await ReportFormat.findByIdAndRemove(req.params.id)
    res.json({ status: 'Report format deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
