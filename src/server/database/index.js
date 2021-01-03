const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const path = require('path')
const adapter = new FileSync(path.resolve(__dirname, './db.json'))
const db = low(adapter);

db.defaults({ todos: [], count: 0}).write()

module.exports = db