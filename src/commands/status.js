'use strict'
const ai = require('../ai')
const got = require('got')
const cheerio = require('cheerio')

module.exports = (msg, match) => {
  const fromId = msg.from.id
  const chatId = msg.chat.id
  const url = match[1]

  got.get(`http://www.downforeveryoneorjustme.com/${url}/`)
    .then((res)=> {
      const $ = cheerio.load(res.body)
      const keyWord = 'is up'
      const content = $('#container').text()
      const regularExp = new RegExp(keyWord, 'g')

      if (content.match(regularExp) !== null) {
        ai.sendMessage(chatId, `${url} is Alive`)
      } else {
        ai.sendMessage(chatId, `${url} is Down`)
      }
    })
}
