var net = require('net')
var server = net.createServer()
var port = 9090

server.on('connection', conn => {

  conn.on('data', data => {
    //console.log(data.toString())
    conn.write(
`HTTP/1.1 200 OK
Content-Type: text/html
Date: ${new Date().toISOString()}

<h1>hello, ${new Date().toLocaleString()}</h1>`)
    conn.end()
    conn.on('error', () => {})
  })

})
server.listen(port, () => {
  console.log('server listening on port'+ port)
})
