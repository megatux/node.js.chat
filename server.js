'use strict'

const http = require('http')
const router = require('./router')

const port = process.env.PORT || 8080
const server = http.createServer()

server.on('request', router)
server.on('listening', onListening)

function onListening () {
  console.log(`Server running in port ${port}`)
}

module.exports = server
if (require.main === module) server.listen(port)
