'use strict'
const ai = require('../ai')
const got = require('got')
const cheerio = require('cheerio')
const moment = require('moment')
const fs = require('fs')
const util = require('../utils')

module.exports = (msg, match) =>{
  const fromId = msg.from.id
  const chatId = msg.chat.id
  const D = moment.unix(msg.date)
  const hhmm = D.format('hhmm')

  const srcImgs = [
    `http://www.clockm.com/tw/img/clk/hour/${hhmm}.jpg`,
    `http://www.bijint.com/assets/pict/jp/pc/${hhmm}.jpg`
  ]

  ai.sendMessage(chatId, util.randomArray(srcImgs))
}
