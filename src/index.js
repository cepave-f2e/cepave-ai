/**
 * Cepave AI
 * @type {string}
 */
'use strict'

const express = require('express')
const server = express()
const ai = require('./ai')
const bodyParser = require('body-parser')

ai.onText(/^\/duty/,  require('./commands/duty'))
ai.onText(/^\/gif (.+)/,  require('./commands/gif'))
ai.onText(/^\/news/,  require('./commands/news'))
ai.onText(/^\/girl/,  require('./commands/girl'))
ai.onText(/^\/time/,  require('./commands/time'))
ai.onText(/^\/status (.+)/,  require('./commands/status'))
ai.onText(/^\/\$/,  require('./commands/money'))
ai.on('message', (msg)=> {
  console.log(msg)
})

server
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use('/webhook', require('./hookRouter'))
  .listen(17777, ()=> {
    console.log('Cepave AI server was listening on port 17777')
  })
