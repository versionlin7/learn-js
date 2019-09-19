const fs = require('fs')
const zlib = require('zlib')

let compressStream = zlib.createGzip
let file = './3.rmvb'

let rs = fs.createReadStream(file)
let ws = fs.createWriteStream('D:/xx/xxx.x', {
  highWaterMark:1024 * 1024 * 100//default 65536
})

// rs.on('data', data => {
//   ws.write(data)
// })

// rs.on('end', () => {
//   ws.end()
// })
rs.on('data', data => {
  if(compressStream.write(data) === false) {//表示写入内存已满
    rs.pause()
  }
})

compressStream.on('drain', () => {
  rs.resume()
})

rs.on('end', () => {
  compressStream.end()
})

compressStream.on('data', data => {
  if(ws.write(data) === false) {
    compressStream.pause()
  }
})

ws.on('drain', () => {
  compressStream.resume()
})
 //####################################
rs.pipe(compressStream).pipe(ws)

ReadableStream.prototype.pipe = function(writable) {
  let rs = this
  rs.on('data', data => {
    if(writable.write(data) === false) {
      rs.pause()
      writable.write(data)
    }
  })
  rs.on('end', data => {
    writable.write(data)
  })
  writable.on('drain', () => {
    rs.resume
  })

  return writable 
}

//#######################
const stream = require('stream')
const { Readable, Writable, Duplex, Transform} = stream

class Compress extends Transform {
  constructor() {

  }
  _transform(chunk, encoding, callback) {
    this.push(process(chunk))
    callback()
  }
}
class TCPConnect extends Readable {
  constructor() {

  }
  _read(size) {
    this.push()
  }
}
class TCPConnect extends Duplex {
  constructor() {

  }
  _read(size) {

  }
  _write(chunk, encoding, done){

  }
}

let myws = new Writable({
  highWaterMark:20,
  write(chunk, encoding, done) {
    setTimeout(() => {
      console.log(chunk.toString())
      done()
    }, 500)
  }
})

let myrs = new Readable({
  highWaterMark: 20,
  read(size) {
    setTimeout(()=> {
      let char = Math.random().toString().slice(2,3)
      this.push()
    }, 200)
  }
})

myrs.on('pause', () => {
  console.log('rs paused')
})
myws.on('drain', () => {
  console.log('ws drained')
})

myrs.pipe(myws)
//########################
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
  return new Writeable({
    write(chunk, encoding, done) {
      fs.write(fd, chunk, 0, chunk.length, position, () => {
        done()

      })
      position += chunk.length
    }
  })
}
//调用文件
const {createReadStream, createWriteStream} = require('./file-read-stream')
createReadStream('./xx.js').pipe(createWriteStream('./aa.js'))




//未完成
function split() {
  let lastHalfLine = ''
  return new Transform({
    objectMode: true,
    transform(chunk, encoding, callback){
      let lines = chunk.toString().split('\r\n')
      if(lines.length > 1) {
        let lastLine = lines.pop()
        if(lastLine != '') {
          lastHalfLine = lastLine
        }
        lines.push(lastLine)
        this.push(lines[0] + lastHalfLine)
        lastHalfLine = ''
        for(let i = 1; i < lines.length; i++) {
          this.push(lines[i])
        }
        callback
      }
    }
  })
}