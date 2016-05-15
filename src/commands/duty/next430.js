const to430 = require('./to430')
const echo = require('./echo')
const getNow = require('../../utils/now')
const isHoliday = require('./is-holiday')

function next430() {
  const to430ms = (to430() - getNow())
  const hours24ms = 24 * 60 * 60 * 1000

  const loopin24H = ()=> {
//    if (isHoliday()) return setTimeout(loopin24H, hours24ms)

    // Cepave all chadId: -23470446
    echo(-23470446, true)
    setTimeout(loopin24H, hours24ms)
  }

  setTimeout(loopin24H, to430ms)
}

module.exports = next430
