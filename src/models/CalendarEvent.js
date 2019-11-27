const { Schema, model } = require('mongoose')

const enventDateSchema = new Schema({ dateTime: Date })
const calendarEventSchema = new Schema({
  summary: String,
  description: String,
  end: enventDateSchema,
  start: enventDateSchema,
  location: String
})

module.exports = model('CalendarEvent', calendarEventSchema, 'calendarEvents')
