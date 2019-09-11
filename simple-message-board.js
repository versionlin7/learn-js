var net = require('net')
var querystring = require('querystring')

var server = net.createServer()

var port = 8080

var msgs = [{
  name: '张三',
  message: 'hello world',
  timestamp: 1567479441335,
}, {
  name: '李四',
  message: 'hello ocean',
  timestamp: 1567479491335,
}]

server.on('connection', conn => {
  conn.on('data', data => {
    var request = data.toString()
    var [header, body] = request.split('\r\n\r\n')
    var [firstLine, ...headers] = header.split('\r\n')
    var [method, path] = firstLine.split(' ')
    
    
    if (method == 'POST') {
      var msg = querystring.parse(body)
      msg.timestamp = Date.now()
      msgs.push(msg)
      conn.write('HTTP/1.1 302 Moved\r\n')
      conn.write('Location: /\r\n\r\n')
      conn.end()
      return
    }

    if (true || method == 'GET') {
      conn.write('HTTP/1.1 200 OK\r\n')
      conn.write('Content-Type: text/html; charset=UTF-8\r\n')
      conn.write('Date: ' + new Date().toString() + '\r\n')
      conn.write('\r\n')
      conn.write(`
        <style>
          .message-box {
            border: 1px solid;
            margin: 5px;
            padding: 10px;
          }
        </style>
        <form method="POST" action="/">
          Name: <br>
          <input name="name" /> <br>
          Message: <br>
          <textarea name="message"></textarea>
          <br>
          <button>提交</button>
        </form>
        <hr>
      `)
      msgs.reduceRight((memo, msg) => {
        var html = `
          <div class="message-box">
            <h3>${msg.name} <small>${new Date(msg.timestamp).toLocaleTimeString()}</small></h3>
            <pre>${msg.message}</pre>
          </div>
        `
        conn.write(html)
      }, null)
      conn.end()
      return
    }


  })
})

server.listen(port, () => {
  console.log('server listening on port', port)
})



// HTTP/1.1 200 OK//首部
// Content-Type: text/html
// Content-Length: 892
// Date: 

// 头