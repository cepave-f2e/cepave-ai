const target = process.argv.slice(-1)[0]
const path = require('path')
const cwd = process.cwd()

require('babel-core/register')
require(path.join(cwd, target))
