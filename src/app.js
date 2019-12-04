const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()

app.use(cors())

app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(require('./controllers/authController'))
app.use(require('./controllers/reportController'))
app.use(require('./controllers/reportFormatController'))
app.use(require('./controllers/mailController'))
app.use(require('./controllers/actionPlanFormatController'))
app.use(require('./controllers/actionPlanController'))
app.use(require('./controllers/calendarController'))
app.use(require('./controllers/nonconformityController'))
app.use(require('./controllers/attachmentController'))

module.exports = app
