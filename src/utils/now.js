const moment = require('moment')

module.exports = ()=> {
  // Taiwan's time zone is UTC +8
  return moment().utcOffset(8)
}
