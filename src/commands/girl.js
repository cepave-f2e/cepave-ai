'use strict'
const ai = require('../ai')
const got = require('got')
const util = require('../utils')
const cheerio = require('cheerio')
const random = util.random
module.exports = (msg, match) =>{
  const fromId = msg.from.id
  const chatId = msg.chat.id

  got.get(`http://ck101.com/forum-1345-${random(1, 10)}.html`)
    .then((res)=> {
      const $ = cheerio.load(res.body)
      const $girlList = $('.waterfall > li')
      const gLeng = $girlList.length

      const aSectionLink = $girlList.eq(random(0, gLeng -1)).find('> .cl_box > a').attr('href')

      return got.get(aSectionLink)
    })
    .then((res)=> {
      const $ = cheerio.load(res.body)
      const imgs = $('#lightboxwrap img[file]')
      const imgsLeng = imgs.length
      const imgURL = imgs.eq(random(0, imgsLeng - 1)).attr('file')

      ai.sendMessage(chatId, imgURL)
    })
}
