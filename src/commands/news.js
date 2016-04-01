'use strict'
const cheerio = require('cheerio')
const got = require('got')
const ai = require('../ai')

module.exports = (msg, match)=> {
  const fromId = msg.from.id
  const chatId = msg.chat.id

  got.get('http://www.appledaily.com.tw/realtimenews/section/new')
    .then((res)=> {
      const $ = cheerio.load(res.body)
      const $news = $('.rtddt')

      $news.each((idx, ne)=> {
        const $new = $(ne)
        const link = $new.find('>a').attr('href')
        const title = $new.find('h1').text().trim()
        const tag = $new.find('h2').text()
        const time = $new.find('time').text()
        const views = /\((.+)\)$/.test(title) && RegExp.$1

        const msg = `[新聞快報] [${tag}] ${time} | ${views}
http://www.appledaily.com.tw${link}        
        `
        ai.sendMessage(chatId, msg)
      })
    })
    .catch((er)=> {
      console.error(er)
    })
}
