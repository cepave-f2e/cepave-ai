'use strict'
const ai = require('../ai')
const got = require('got')
const cheerio = require('cheerio')

module.exports = (msg, match) => {
  const fromId = msg.from.id
  const chatId = msg.chat.id
  const inputCurrency = msg.text.split(' ').pop()
  const EMOJI_MOMENY_BAG = '\u{1F4B0}'
  const EMOJI_INFO = '\u{2139}'
  const bankCode = 'TSIBTWTP'
  const currency = {
    USD: 0,
    EUR: 1,
    JPY: 2,
    HKD: 3,
    GBP: 4,
    CHF: 5,
    CNY: 6,
    AUD: 7,
    NZD: 8,
    SGD: 9,
    THB: 10,
    SEK: 11,
    CAD: 12,
    ZAR: 13
  }

  const getExchange = (bankCode, currencyNumber) => {
    got.get(`https://tw.rter.info/json.php?t=bank&q=check&iso=${bankCode}`)
      .then((res) => {
        const data = JSON.parse(res.body).data
        const currency = cheerio.load(data[currencyNumber][0])('.text-primary').text()
        const buying = data[currencyNumber][1]
        const selling = data[currencyNumber][2]
        const updateTime = data[currencyNumber][3]

        ai.sendMessage(chatId, `${currency} ${EMOJI_MOMENY_BAG}\nBuying: ${buying}    Selling: ${selling} \nLast updated: ${updateTime}\nDisclaimer : All information is for reference only.`)
      })
  }

  if (inputCurrency !== '/$') {
    return getExchange(bankCode, currency[inputCurrency])
  }

  const opts = {
    reply_to_message_id: msg.message_id,
    reply_markup: JSON.stringify({
      keyboard: [
        ['/$ USD'],
        ['/$ EUR'],
        ['/$ JPY'],
        ['/$ HKD'],
        ['/$ GBP'],
        ['/$ CHF'],
        ['/$ CNY'],
        ['/$ AUD'],
        ['/$ NZD'],
        ['/$ SGD'],
        ['/$ THB'],
        ['/$ SEK'],
        ['/$ CAD'],
        ['/$ ZAR']
      ],
      one_time_keyboard: true,
      selective: true
    })
  }
  ai.sendMessage(chatId, `${EMOJI_INFO} Select the currency`, opts);
}
