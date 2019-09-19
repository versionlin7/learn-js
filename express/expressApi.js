const express = require('express')

const port = 9090
const app = express()


//localhost:9090/static/foo/bar
//'/foo/bar'
app.get('/static', (req, res, next) => {
  console.log(req.url)
  res.end('get')
})

app.use('/static', (req, res, next) => {
  console.log(req.url)
  res.end('hello')
})


app.listen(port, () => {
  console.log(port)
})