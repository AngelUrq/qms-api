const { Schema, model } = require('mongoose')

const enventDateSchema = new Schema({ dateTime: Date })
const attendeesSchema = new Schema({ email: String })
const calendarEventSchema = new Schema({
  summary: String,
  description: String,
  end: enventDateSchema,
  start: enventDateSchema,
  location: String,
  attendees: [attendeesSchema]
})

module.exports = model('CalendarEvent', calendarEventSchema, 'calendarEvents')
