//client.js
function JSONP(url, data) {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script')
    let callbackName = 'JSON_CALLBACK_' + Date.now() + Math.random().toString(16).slice(2)

    url = url + '?' + [...Object.entries(data)].map(pair => {
      return pair.join('=')
    }).join('&') + '&callback=' + callbackName

    window[callbackName] = function(data) {
      delete window[callbackName]
      document.head.removeChild(script)
      resolve(data)
    }

    script.src = url

    script.onerror = function(e) {
      delete window[callbackName]
      document.head.removeChild(script)
      reject(e)
    }

    document.head.appendChild(script)
  })
}
//use
jsonp('http://localhost:3000/say',{
  params: { wd: 'I' },
  callback: 'show'
}).then(data => {
  console.log(data)
}).catch(err => {
  console.log('error')
})
//server.js
let express = require('express')
let app = express()
app.get('/say', function(req, res) {
  let { wd, callback } = req.query
  console.log(wd) 
  console.log(callback)
  res.end(`${callback}(data)`)
})
app.listen(3000)