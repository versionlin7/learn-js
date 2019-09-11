var net = require('net')
var queryString = require('querystring')
var port = 9090
var server = net.createServer()
var msgs = [{
  name:'zs',
  message:'hi ',
  timestamp:1567508556230,
},{
  name:'ls',
  message:'hello',
  timestamp:1567508886240,
}]


server.on('connection', conn => {
  conn.on('data', (data) => {
    let request = data.toString()
    let [head, body] = request.split('\r\n\r\n')
    let [firstLine, ...lines] = head.split('\r\n')
    let [method, path, pol] = firstLine.split(' ')

    if(method == 'POST') {
      let msg = queryString.parse(body)
      msg.timestamp = Date.now()
      msgs.push(msg)
      conn.write('HTTP/1.1 302 moved\r\n')
      conn.write('Location: /\r\n\r\n')
      conn.end()
      return 
    }

    if(method == 'GET') {
      conn.write('HTTP/1.1 200 OK\r\n')
      conn.write('Content-Type: text/html; charset=UTF-8\r\n')
      conn.write('Date:'+ new Date().toLocaleDateString()+'\r\n')
      conn.write('\r\n')
      conn.write(`
        <style> 
          .message-box {
            border:2px solid;
            margin:5px;
            padding:4px;
            width:500px;
          }
        </style>
        <form method="POST" action="/">
          Name:<br>
          <input type="text" name="name"><br>
          Message:<br>
          <textarea name="message" id="" cols="25" rows="5"></textarea><br>
          <button>提交</button>
        </form>
        <hr>
      `)
      msgs.reduceRight((memo, msg)=> {
        conn.write(`
          <div class="message-box">
            <h3>${msg.name} <small>${new Date(msg.timestamp).toLocaleString()}</small></h3>
            <pre>${msg.message}</pre>
          </div>
        `)
      },null)
      conn.end()
      return 
    }

  })
})
server.listen(port, ()=> {
  console.log('server port' + port)
})