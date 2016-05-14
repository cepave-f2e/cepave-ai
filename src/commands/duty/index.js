'use strict'
const moment = require('moment')
const got = require('got')

const db = require('./db')
const getNow = require('../../utils/now')
const ai = require('../../ai')
const personList = require('./personList')
const holiday2016 = require('./holiday-2016')

require('./next430')()

module.exports = (msg, match)=> {
  const fromId = msg.from.id
  const chatId = msg.chat.id
  const now = getNow()

  if (now.days() === 6) {
    ai.sendMessage(chatId, `親，今天是星期六，不需要值日生`)
  } else if (now.days() === 0) {
    ai.sendMessage(chatId, `親，今天是星期日，不需要值日生`)
  } else if (holiday2016[now.format('MMDD')]) {
    ai.sendMessage(chatId, `親，今天是${holiday2016[now.format('MMDD')]}節日，不需要值日生`)
  } else {
    db.findOne({}, (er, doc)=> {
      const dutyID = doc.duty
      const who = personList[dutyID]

      ai.sendMessage(chatId, `今天的值日生是: ${who.name} (${who.en})`)
    })
  }
}
