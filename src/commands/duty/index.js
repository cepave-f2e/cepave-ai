'use strict'
const echo = require('./echo')

require('./next430')()

module.exports = (msg, match)=> {
  const fromId = msg.from.id
  const chatId = msg.chat.id

  echo(chatId, false)
}
