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
`
ai.onText(/^\/gif (.+)/,  require('./commands/gif'))
ai.onText(/^\/girl/,  require('./commands/girl'))
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


const getAppleNews = require('./apple-news')

getAppleNews(9, [-113258008])
