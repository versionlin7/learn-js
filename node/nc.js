let host = process.argv[2]
let port = parseInt(process.argv[3])
const net = require('net')

process.stdin.pipe(net.connect(port, host)).pipe(process.stdout)

//执行文件
// node nc.js www.xxx.com 80
// GET / HTTP/1.1