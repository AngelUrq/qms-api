const { Schema, model } = require('mongoose')

const actionPlanFormatSchema = new Schema({
  name: String,
  creationDate: Date,
  lastModificationDate: Date,
  structure: Object
})

module.exports = model('ActionPlanFormat', actionPlanFormatSchema, 'actionPlanFormats')
