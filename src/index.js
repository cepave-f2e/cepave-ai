/**
 * Cepave AI
 * @type {string}
 */
'use strict'


const express = require('express')
const server = express()
const ai = require('./ai')
const bodyParser = require('body-parser')

;`@commands
gif - [-r (random)] query a gif image from GIPHY
girl - get random beauty girl photo
news - get latest Apple News 
status - get web site status 
`
ai.onText(/^\/gif (.+)/,  require('./commands/gif'))
ai.onText(/^\/news/,  require('./commands/news'))
ai.onText(/^\/girl/,  require('./commands/girl'))
ai.onText(/^\/status (.+)/,  require('./commands/status'))
ai.on('message', (msg)=> {
  console.log(msg)
})

const hookRouter = require('./hookRouter')

server
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use('/webhook', hookRouter)
  .listen(17777, ()=> {
    console.log('Cepave AI server was listening on port 17777')
  })
