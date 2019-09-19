```js
let http = require('http')
const server = http.createServer()
//const server = new http.Server()
const port = 8080

server.on('request', (request, response) => {
  console.log(request.socket.remoteAddress)
  console.log(request.method, request.url)
  console.log(request.headers)

  response.write('hello world')
  response.end()
})

server.listen(port, () => {
  console.log('server listening on port', port)
})


var server = http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type':'text/html'})
    response.write('<h1>Hello</h1>' + request.url)
    response.end()
})
server.listen(8000)
class HttpServer{
  constructor(f) {
    var net = require('net')
    net.createServer(conn => {
        
    })
  }
}

```

![1568547864287](D:\CODE\js\node\httpModule.assets\1568547864287.png)

```js
const http = require('http')
const server = http.createServer()
const fs = require('fs')
const fsp = fs.promises
const path = require('path')
const queryString = require('querystring')

const port = 9090
const basedir = __dirname //'./'
const msgs = [{
  content:'hello',
  name:'zs'
}]

server.on('request', (request, response) => {
  if(request.method == 'GET') {
    response.writeHead(200, {
      'Content-Type': 'text/html; charset=UTF-8'
    })
    response.write(`
    
    `)
  } 
  if(request.method == 'POST') {
    request.on('data', data => {
      var msg = queryString.parse(data.toString())
      msgs.push(msg)
      response.writeHead(301,{
        'Location': '/'
      })
      response.end()
    })
  }
})
http.createServer((req,res)=> {

})

server.listen(port, () => {
  console.log('success link'+ port)
})
```