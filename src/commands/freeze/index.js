'use strict'
const ai = require('../../ai')
const db = require('./db')
const getNow = require('../../utils/now')
const moment = require('moment')

module.exports = (msg, args)=> {
  const chatId = msg.chat.id

  if (args[1] === 'set') {

    db.findOne({}, (er, doc)=> {
      db.update(doc, {codeFreezeDay: args[2]})
      ai.sendMessage(chatId, `${args[2]} has been set as the code freeze day.`)
    })

  } else if (args[1] === 'get') {

    db.findOne({}, (er, doc)=> {
      ai.sendMessage(chatId, `Code freeze ${moment(doc.codeFreezeDay, "YYYYMMDD").fromNow()}`)
    })

  }
}
