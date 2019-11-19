const { Schema, model } = require('mongoose')

const reportFormatSchema = new Schema({
  name: String,
  version: String,
  creationDate: String,
  lastModificationDate: String,
  title: String,
  subtitles: []
})

module.exports = model('ReportFormat', reportFormatSchema, 'report_formats')
