const token = '207182742:AAGrB9-Ok20tYqv_u7DrJHrORfUIVJkY_oQ'
const TelegramBot = require('node-telegram-bot-api')

const ai = new TelegramBot(token, {polling: true})

module.exports = ai