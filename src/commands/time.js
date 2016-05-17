'use strict'
const ai = require('../ai')
const got = require('got')
const cheerio = require('cheerio')
const util = require('../utils')
const getNow = require('../utils/now')

module.exports = (msg, match) =>{
  const fromId = msg.from.id
  const chatId = msg.chat.id
  const now = getNow()
  const HHmm = now.format('HHmm')
  const srcImgs = [
    `http://www.clockm.com/tw/img/clk/hour/${HHmm}.jpg`,
    `http://www.bijint.com/assets/pict/jp/pc/${HHmm}.jpg`
  ]

  ai.sendMessage(chatId, util.randomArray(srcImgs))
}
