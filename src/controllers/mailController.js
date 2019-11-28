const express = require('express')
const router = express.Router()
const Mail = require('../models/Mail')
const nodemailer = require('nodemailer')

router.post('/api/mail/send', async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'UPBgestiondecalidad@gmail.com',
      pass: 'upbcalidad'
    }
  })

  const { from, to, subject, text, html } = req.body
  const mail = new Mail({
    from,
    to,
    subject,
    text,
    html
  })

  const info = ({
    from: mail.from, // sender address
    to: mail.to, // list of receivers
    subject: mail.subject, // Subject line
    text: mail.text, // plain text body
    html: mail.html // html body
  })

  transporter.sendMail(info, function (err, data) {
    if (err) {
      console.log(err)
    } else {
      console.log('Email sent!')
    }
  })
})

module.exports = router
