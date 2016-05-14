const getNow = require('../../utils/now')
const holiday2016 = require('./holiday-2016')

module.exports = ()=> {
  const now = getNow()
  return now.days() === 6 ||
    now.days() === 0 ||
    holiday2016[now.format('MMDD')]
}
