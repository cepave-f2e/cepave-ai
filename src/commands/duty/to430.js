'use strict'
const moment = require('moment')
const getNow = require('../../utils/now')


const setTo430 = (D)=> {
  return D.hours(16).minutes(30).second(0).milliseconds(0)
}

module.exports = ()=> {
  const now = getNow()
  const nowHours = now.hours()
  const nowMinutes = now.minutes()

  let to430 = moment()
  if (nowHours < 16 || (nowHours === 16 && nowMinutes <= 30)){
    return setTo430(to430)
  } else {
    return setTo430(to430.add(1, 'd'))
  }
}
