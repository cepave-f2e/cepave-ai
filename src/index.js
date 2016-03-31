/**
 * Cepave AI
 * @type {string}
 */
'use strict'


const ai = require('./ai')

ai.onText(/^\/gif (.+)/,  require('./commands/gif'))
