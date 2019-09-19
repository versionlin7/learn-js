# Stream

双工流: TCP Conn

转换流： zip



1.

```js
const fs = require('fs')

let file = './3.rmvb'

fs.readFile(file, (err, data) => {
  if(err) {
    console.log(err)
  }else {
    fs.write('x.mp4', data, () => {
      console.log('done')
    })
  }
})

setInterval(() => {
  console.log(process.memoryUsage)
}, 200);
```

2.

```js
const fs = require('fs')

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
  if(ws.write(data) === false) {//表示写入内存已满
    rs.pause()
  }
})

ws.on('drain', () => {
  rs.resume()
})

```

3.

```js
rs.pipe(ws)
```

4.

```js
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
```

![1568731781935](D:\CODE\js\node\streamModule .assets\1568731781935.png)

![1568732076134](D:\CODE\js\node\streamModule .assets\1568732076134.png)

