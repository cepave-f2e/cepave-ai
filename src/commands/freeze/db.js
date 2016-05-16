const NEDB = require('nedb')

const db = new NEDB({ filename: `${__dirname}/freeze.db`, autoload: true })

// set default is none
db.find({}, function (err, docs) {
  if (!docs.length) {
    db.insert({codeFreezeDay: 1})
  }
})

module.exports = db
