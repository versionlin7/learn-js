module.exports = function(option) {
  return (req, res, next) => {
    let bodyStr = ''
    req.on('data', data => {
      bodyStr += data.toString()
    })
    req.on('end', () => {
      if(req.is('json')) {
        req.body = JSON.parse(bodyStr)
      }else if(req.is('urlencoded')){
        //mimeType a=b&c=d 'application/x-www-form-urlencoded'
        req.body = url.parse(bodyStr)
      }else {
        req.body = bodyStr
      }
      next()
    })
  }
}