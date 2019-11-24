const express = require('express')
const router = express.Router()
const ActionPlanFormat = require('../models/ActionPlanFormat')
const verifyToken = require('./verifyToken')

router.get('/api/action-plan-formats', async (req, res) => {
  try {
    const actionPlanFormats = await ActionPlanFormat.find()

    if (!actionPlanFormats) {
      return res.status(404).send('No action plan formats found')
    }

    res.json(actionPlanFormats)
  } catch (error) {
    res.json({ message: error })
  }
})

router.post('/api/action-plan-formats', verifyToken, async (req, res) => {
  try {
    const { name, creationDate, lastModificationDate, structure } = req.body

    ActionPlanFormat.create({
      name,
      creationDate,
      lastModificationDate,
      structure
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

router.put('/api/action-plan-formats/:id', async (req, res) => {
  try {
    await ActionPlanFormat.findByIdAndUpdate(req.params.id, req.body)
    res.json({ updated: true })
  } catch (error) {
    res.status(500).json({ updated: false })
  }
})

router.delete('/api/action-plan-formats/:id', verifyToken, async (req, res) => {
  try {
    await ActionPlanFormat.findByIdAndDelete(req.params.id)
    res.json({ deleted: true })
  } catch (error) {
    res.status(500).json({ deleted: false })
  }
})

module.exports = router
