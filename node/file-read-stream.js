const {Readable, Writable} = require('stream')
const fs = require('fs')

module.exports.createReadStream = function createReadStream(path) {
  let fd = fs.openSync(path, 'r')
  let fileStat = fs.statSync(path)
  let fileSize = fileStat.size
  let position = 0
  
  return new Readable({
    read(size) {
      let buf = Buffer.alloc(1024)
      if(position >= fileSize) {
        this.push(null)
        fs.close(fd, err => {
          if(err) {
            console.log(err)
          }
        })
      }else {
        fs.read(fd, buf, 0, 1024, position, (err, bytesRead, buf) => {
          if(err) {
            console.log(err)
            return 
          }
          if(bytesRead < 1024) {
            this.push(buf.slice(0, bytesRead))
          }else {
            this.push(buf)
          }
        })
        position += 1024
      }
    }
  })
}

module.exports.createWriteStream = function createWriteStream(paht) {
  let fd = fs.openSync(path, 'a+')
  let position = 0
  return new Writable({
    write(chunk, encoding, done) {
      fs.write(fd, chunk, 0, chunk.length, position, () => {
        done()

      })
      position += chunk.length
    }
  })
}