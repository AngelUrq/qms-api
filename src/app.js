const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(require('./controllers/authController'))
app.use(require('./controllers/reportController'))
app.use(require('./controllers/reportFormatController'))
app.use(require('./controllers/mailController'))
app.use(require('./controllers/actionPlanFormatController'))
app.use(require('./controllers/actionPlanController'))

module.exports = app
