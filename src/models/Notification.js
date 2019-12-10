const { Schema, model } = require('mongoose')

const notificationFormat = new Schema({
  email: String, // '"Name Here" <Sender@example.com>'
  type: String, // reciever@gmail.com
  message: String
})

module.exports = model('Notification', notificationFormat, 'Notifications')
