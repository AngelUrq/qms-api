const { Schema, model } = require('mongoose')

const actionPlanFormatSchema = new Schema({
  name: String,
  description: String,
  creationDate: Date,
  formatID: String,
  findingType: String,
  structure: Object
})

module.exports = model('ActionPlan', actionPlanFormatSchema, 'actionPlans')
