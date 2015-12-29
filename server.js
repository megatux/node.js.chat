'use strict'

const http = require('http')
const fs = require('fs')
const path = require('path')
const port = process.env.PORT || 8080
const server = http.createServer()

server.on('request', onRequest)
server.on('listening', onListening)

function onRequest (req, res) {
  let fileName = path.join(__dirname, 'public', 'index.html')
  let rs = fs.createReadStream(fileName)

  res.writeHead(200, {'Content-Type': 'text/html' });
  rs.pipe(res)
  rs.on('error', function(err) {
    res.end(err.message)
  })
}

function onListening () {
  console.log(`Server running in port ${port}`)
}

module.exports = server
if (require.main === module) server.listen(port)
