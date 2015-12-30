'use strict'

const http = require('http')
const fs = require('fs')
const path = require('path')
const port = process.env.PORT || 8080
const server = http.createServer()

server.on('request', onRequest)
server.on('listening', onListening)

function onRequest (req, res) {
  let uri = req.url
  if(uri === '/' || uri === '/index' || uri === '/index.html') {
    return servePublicFile('index.html', 'text/html', res)
  }
  if(uri === '/app.js') {
    return servePublicFile('app.js', 'text/javascript', res)
  }

  res.statusCode = 404
  res.end(`404 not found: ${uri}`)
}

function onListening () {
  console.log(`Server running in port ${port}`)
}

function servePublicFile(filePath, contentType, res) {
  let fileName = path.join(__dirname, 'public', filePath)
  let rs = fs.createReadStream(fileName)

  res.writeHead(200, {'Content-Type': contentType });
  rs.pipe(res)

  rs.on('error', function(err) {
    res.writeHead(500, {'Content-Type': 'text/plain' });
    res.end(err.message)
  })
}

module.exports = server
if (require.main === module) server.listen(port)
