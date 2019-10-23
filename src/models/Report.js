const { Schema, model } = require('mongoose')

const reportSchema = new Schema({
  filename: String,
  data: String,
  creationDate: Date,
  lastModificationDate: Date
})

module.exports = model('Report', reportSchema, 'reports')
