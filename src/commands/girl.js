'use strict'
const ai = require('../ai')
const got = require('got')
const util = require('../utils')

module.exports = (msg, match) =>{
  const fromId = msg.from.id
  const chatId = msg.chat.id

  got.get(`http://www.tngou.net/tnfs/api/news`)
    .then((res)=> {
      const data = JSON.parse(res.body).tngou
      const imgurl = data[util.random(0, data.length -1)].img

      ai.sendMessage(chatId, `http://tnfs.tngou.net/img${imgurl}`)
    })
}
