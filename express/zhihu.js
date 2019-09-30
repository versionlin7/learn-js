const express = require('express')

const port = 9092
const app = express()

app.use((req,res, next) => {
  res.setHeader('ContentType', 'text/plain; charset=UTF-8')
})

app.get('/', (req, res, next) => {
  res.end('首页')
})

//question/13545
app.get('/question/:id', (req, res, next) => {
  res.end(`您正在查看第${req.params.id}号问题`)
})