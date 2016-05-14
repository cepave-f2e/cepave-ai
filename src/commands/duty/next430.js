const db = require('./db')
const personList = require('./personList')
const to430 = require('./to430')
const isHoliday = require('./is-holiday')
const getNow = require('../../utils/now')

const personSize = Object.keys(personList).length

function next430() {
  const to430ms = (to430() - getNow())
  const hours24ms = 24 * 60 * 60 * 1000

  const loopin24H = ()=> {
    if (isHoliday()) return

    db.findOne({}, (er, doc)=> {
      const dutyID = doc.dutyID
      const nextDutyID = dutyID + 1
      const who = personList[dutyID]

      // Cepave all: -23470446
      ai.sendMessage(-23470446, `今天的值日生是: ${who.name} (${who.en})`)

      db.update(doc, {dutyID: nextDutyID > personSize ? 1 : nextDutyID})
    })

    setTimeout(loopin24H, hours24ms)
  }

  setTimeout(loopin24H, to430ms)
}

module.exports = next430
