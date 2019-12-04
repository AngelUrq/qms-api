const { Schema, model } = require('mongoose')

const attachmentFormatSchema = new Schema({
  filePath: String,
  originalName: String,
  userID: String,
  actionPlanID: String,
  activityID: String
})

module.exports = model('Attachment', attachmentFormatSchema, 'attachments')
