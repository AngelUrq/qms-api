const { Schema, model } = require('mongoose')

const reportFormatSchema = new Schema({
  name: String,
  version: String,
  creationDate: Date,
  lastModificationDate: Date,
  title: String,
  subtitles: []
})

module.exports = model('ReportFormat', reportFormatSchema, 'reportFormats')
