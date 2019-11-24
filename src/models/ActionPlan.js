const { Schema, model } = require('mongoose')

const actionPlanFormatSchema = new Schema({
  name: String,
  creationDate: Date,
  formatID: String
})

module.exports = model('ActionPlan', actionPlanFormatSchema, 'actionPlans')
