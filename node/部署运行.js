const https = require('https')
const http = require('http')
const express = require('express')
const fs = require('fs')

const app = express()

const server = http.createServer(app)
const httpsServer = https.createServer({
  key : fs.readFileSync('/root/.acme.sh/7.versionlin.com/7.versionlin.com.key'),
  cert : fs.readFileSync('/root/.acme.sh/7.versionlin.com/7.versionlin.com.cer')
},app)



httpsServer.listen(443, () => {
  console.log('listen 443')
})
server.listen(80, () => {
  console.log('listen 80')
})