const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')
const userSchema = new Schema({
  code: String,
  password: String,
  firstNames: String,
  paternalLastName: String,
  maternalLastName: String,
  email: String,
  city: String,
  phone: String,
  notes: String,
  role: String
})
userSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password)
}

module.exports = model('User', userSchema, 'users')
