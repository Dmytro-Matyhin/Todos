const express = require('express')
const cors = require('cors')
const http = require('http')
const config = require('./config')

const { todos: todos } = require('./routes')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/todos', todos)


app.set('port', config.get('port'))

http.createServer(app).listen(app.get('port'), function() {
  console.log(`Server is listening on port ${config.get('port')}`)
})