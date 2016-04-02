const token = process.NODE_ENV === 'production'
  // CepaveAI_bot
  ? '207182742:AAGrB9-Ok20tYqv_u7DrJHrORfUIVJkY_oQ'
  
  // CepaveAIDev_bot
  : '160573493:AAE6g3u8NFNqQXwDZPrHWuQIg2wKPnyX94A'

const TelegramBot = require('node-telegram-bot-api')

const ai = new TelegramBot(token, {polling: true})

module.exports = ai
