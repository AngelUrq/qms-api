const express = require('express')
const router = express.Router()
const Attachment = require('../models/Attachment')

const verifyToken = require('./verifyToken')

const multer = require('multer')
const upload = multer({
  dest: './uploads/'
})

router.get('/api/attachments/:actionPlanID/:activityID', async (req, res) => {
  try {
    const attachments =
      await Attachment.find({
        actionPlanID: req.params.actionPlanID,
        activityID: req.params.activityID
      })

    if (!attachments) {
      return res.status(404).send('No attachments found')
    }

    res.json(attachments)
  } catch (error) {
    res.json({ message: error })
  }
})

router.get('/api/attachments/:id', async (req, res) => {
  try {
    const attachment = await Attachment.findById(req.params.id)

    if (!attachment) {
      return res.status(404).send('No attachment found')
    }

    res.json(attachment)
  } catch (error) {
    res.json({ message: error })
  }
})

router.post('/api/attachments', async (req, res) => {
  try {
    const { filePath, originalName, userID, actionPlanID, activityID } = req.body

    Attachment.create(
      {
        filePath,
        originalName,
        userID,
        actionPlanID,
        activityID
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

router.post('/api/attachments/upload', upload.single('file'), async (req, res) => {
  try {
    res.json({ file: req.file })
  } catch (error) {
    console.log(error)
    res.status(500).json({ created: false })
  }
})

router.get('/api/attachments/download/:filepath', async (req, res) => {
  try {
    const file = './uploads/' + req.params.filepath
    res.download(file)
  } catch (error) {
    console.log(error)
    res.status(500).json({ created: false })
  }
})

router.delete('/api/attachments/:id', verifyToken, async (req, res) => {
  try {
    await Attachment.findByIdAndDelete(req.params.id)
    res.json({ deleted: true })
  } catch (error) {
    res.status(500).json({ deleted: false })
  }
})

module.exports = router
