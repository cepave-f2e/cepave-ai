'use strict'
const express = require('express')
const hookRouter = express.Router()
const ai = require('./ai')

hookRouter.post('/cepaveai', (req, res)=> {
//  send to OWL Dev私密小世界
//  ai.sendMessage(-113258008, `testing owl-portal git pushed`)

  // Rocky
  ai.sendMessage(169050877, `testing owl-portal git pushed`)

  res.send(req.body)
})

module.exports = hookRouter
