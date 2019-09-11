var net = require('net')

var port = 9090

var server = net.createServer(function(conn) {
  console.log('someone connected', conn.remoteAddress, conn.remotePort)

  conn.on('data', data => {
    console.log(conn.remoteAddress, conn.remotePort, 'says:', data.toString())
    conn.write(data.toString().toUpperCase())
  })

  conn.on('error', () => {})

})

server.listen(port, () => {
  console.log('server listening on port', port)
})




var net = require('net')

server = net.createServer()

server.on('connection', conn => {

})

server.listen(8080)







conn = net.connect(port, ip)

conn.on('data', d => {
  console.log(d.toString())
})

conn.write('hello')
