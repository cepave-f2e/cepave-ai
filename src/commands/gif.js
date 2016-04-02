'use strict'
const ai = require('../ai')
const got = require('got')
const util = require('../utils')

module.exports = (msg, match) =>{
  const fromId = msg.from.id
  const chatId = msg.chat.id
  let q = match[1]

  const isRandom = /^-r\s(.+)/.test(q)
  if (isRandom) {
    q = RegExp.$1
  }

  got.get(`http://api.giphy.com/v1/gifs/search?q=${q}&api_key=dc6zaTOxFJmzC`)
    .then((res)=> {
      const data = JSON.parse(res.body).data
      if (data.length) {
        let imgurl = data[0].images.fixed_height.url

        if (isRandom) {
          imgurl = util.randomArray(data).images.fixed_height.url
        }

        ai.sendMessage(chatId, `${q}\n${imgurl}`)
      } else {
        ai.sendMessage(chatId, `Can't found any result: ${q}`)
      }
    })
}
