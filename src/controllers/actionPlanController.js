const express = require('express')
const router = express.Router()
const ActionPlan = require('../models/ActionPlan')

const verifyToken = require('./verifyToken')

router.get('/api/action-plans', async (req, res) => {
  try {
    const actionPlans = await ActionPlan.find()

    if (!actionPlans) {
      return res.status(404).send('No action plan formats found')
    }

    res.json(actionPlans)
  } catch (error) {
    res.json({ message: error })
  }
})

router.post('/api/action-plans', async (req, res) => {
  try {
    const { name, description, creationDate, formatID, structure } = req.body

    ActionPlan.create(
      {
        name,
        creationDate,
        description,
        formatID,
        structure
      },
      (err, room) => {
        if (err) {
          console.log(err)
          res.status(500).json({ created: false })
        } else {
          res.json({ created: true, id: room.id })
        }
      }
    )
  } catch (error) {
    console.log(error)
    res.status(500).json({ created: false })
  }
})

router.put('/api/action-plans/:id', async (req, res) => {
  try {
    await ActionPlan.findByIdAndUpdate(req.params.id, req.body)
    res.json({ updated: true })
  } catch (error) {
    res.status(500).json({ updated: false })
  }
})

router.delete('/api/action-plans/:id', verifyToken, async (req, res) => {
  try {
    await ActionPlan.findByIdAndDelete(req.params.id)
    res.json({ deleted: true })
  } catch (error) {
    res.status(500).json({ deleted: false })
  }
})

module.exports = router
