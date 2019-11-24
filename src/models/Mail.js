const { Schema, model } = require('mongoose')

const mailOptions = new Schema({
  from: String, // '"Name Here" <Sender@example.com>'
  to: String, // reciever@gmail.com
  subject: String,
  text: String,
  html: String
})

module.exports = model('Mail', mailOptions, 'mails')
