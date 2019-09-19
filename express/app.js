let express = require('express')
let server = express()

let port = 9090
// const static = require('./static.js')
const bodyParse = require('./body-parse.js')

server.use((req, res, next) => {
  console.log(req.method, req.url)
  next()
})

// server.use((req, res, next) => {
//   if(req.method == 'GET') {
//     res.end('hello')
//   }
//   next()
// })

server.use(express.cors({
  maxAge:86400//Access-Control-Max-Age:86400
}))
server.use(express.static('./public'))
server.use(express.json())
server.use(express.urlencoded({extended:true}))//true 扩展url编码

// server.use(static('./public'))
server.use(bodyParse('json'))

server.use('/foo', f, g, h, i)
server.use('/foo', [f, g, h, i] )

server.use((req, res, next) => {
  let time = Date.now() - req.startTime
  console.log('request task', time, 'ms')
})

server.listen(port, () => {
  console.log(port)
})