const { Schema, model } = require('mongoose')

const reportFormatSchema = new Schema({
  code: String,
  name: String,
  version: String,
  creationDate: Date,
  lastModificationDate: Date,
  title: String,
  subtitles: Object
})

module.exports = model('ReportFormat', reportFormatSchema)