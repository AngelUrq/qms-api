const { Schema, model } = require('mongoose')

const nonconformitySchema = new Schema({
  text: String,
  type: String
})

module.exports = model('Nonconformity', nonconformitySchema, 'nonconformities')
