const { Router } = require('express')
const router = Router()
const fs = require('fs')
const readline = require('readline')
const { google } = require('googleapis')
const Event = require('../models/CalendarEvent')

// If modifying these scopes, delete token.json.
const SCOPES = 'https://www.googleapis.com/auth/calendar'

const TOKEN_PATH = 'token.json'

// Load client secrets from a local file.

function authorize (credentials, callback) {
  // eslint-disable-next-line camelcase
  const { client_secret, client_id, redirect_uris } = credentials.installed
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback)
    oAuth2Client.setCredentials(JSON.parse(token))
    callback(oAuth2Client)
  })
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken (oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  })
  console.log('Authorize this app by visiting this url:', authUrl)
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close()
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err)
      oAuth2Client.setCredentials(token)
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err)
        console.log('Token stored to', TOKEN_PATH)
      })
      callback(oAuth2Client)
    })
  })
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */

router.post('/api/calendar-events/add-event', async (req, res) => {
  const { summary, description, startDate, endDate, location } = req.body
  const event = new Event({
    summary: summary,
    description: description,
    end: { dateTime: endDate },
    start: { dateTime: startDate },
    location: location
  })
  console.log(event)
  function insertEvent (auth) {
    const calendar = google.calendar({ version: 'v3', auth })
    calendar.events.insert({
      auth,
      calendarId: 'primary',
      resource: event
    }, function (err, event) {
      if (err) {
        console.log('Error contacting calendar service:' + err)
      } else {
        res.json({ created: true })
        console.log('Event created: %s', event.htmlLink)
      }
    })
  }
  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err)
    // Authorize a client with credentials, then call the Google Calendar API.
    authorize(JSON.parse(content), insertEvent)
  })
})

module.exports = router
