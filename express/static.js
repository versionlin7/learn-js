module.exports = function(dir) {
  return async (req, res, next) => {
      let path = require('path')
      let fsp = require('fs').promises
      let base = './static'
      let targetPath = path.join(base, req.url)
      try {
        let stat = await fsp.stat(targetPath)
        if(stat.isFile()) {
          fsp.createReadStream(targetPath).pipe(res)
          //res.end()
        }else {
          next()
        }
      } catch (e) {
        next()
      }
  }
}
