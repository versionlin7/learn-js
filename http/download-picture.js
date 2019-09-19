var net = require('net')
var server = net.createServer()
var port = 9091

server.on('connection', (conn) => {
  conn.on('data', (data) => {
    let request = data.toString()
    let [head, body] = request.split('\r\n\r\n')
    let [firstLine, ...lines] = head.split('\r\n')
    let [method, path, pol] = firstLine.split(' ')

    if(method == 'GET') {
      conn.write('HTTP/1.1 200 NOOK\r\n')
      conn.write('Content-Type: text/html; charset=UTF-8\r\n')
      conn.write('Date: '+ new Date().toLocaleDateString()+ '\r\n')
      conn.write('\r\n')
      conn.write(`
        <button class="down" style="display:block;margin:0 auto">下载图片</button><br>
        <button class="down1" style="display:block;margin:0 auto">下载图片1</button><br>
        <button class="down2" style="display:block;margin:0 auto">下载图片2</button><br>
        <hr>
        <span class="load" style="font-size:100px"></span>
        <div style='width:100%,height:100%;'></div>
        <script>
          let down = document.querySelector('.down')
          let down1 = document.querySelector('.down1')
          let down2 = document.querySelector('.down2')
          let load = document.querySelector('.load')
          let image = document.querySelector('div')
          function getURL(url, callback) {
            var req = new XMLHttpRequest()
            req.open('GET', url, true)

            req.addEventListener('load', e => {
              if(req.status < 400) {
                callback(req)
              }else {
                callback(null, new Error('Request Failed: ' + req.statusText))
              }
              req.addEventListener('error', ()=> {
                callback(null, new Error('Network Error'))
              })
            })
            req.send(null)
          }

          class Queue {
            constructor() {
              this.tasks = []
              this.hasRunning = false
            }
          
            add(f) {
              let that = this
              if(!this.hasRunning) {
                this.hasRunning = true
                f(function next() {
                  if(that.tasks.length) {
                    that.nextTask = that.tasks.shift()
                    that.nextTask(next)
                  }else {
                    that.hasRunning = false
                  }
                })
              }else {
                this.tasks.push(f)
              }
              return this
            }
          }

          function getImage(url, callback) {
            let img = document.createElement('img')
            img.onload = () => {
              callback(img)
            }
            img.src = url
          }


          down1.addEventListener('click', e => {
            load.textContent = '加载中...'
            let url = 'http://xieranmaya.github.io/images/cats/cats.json'
            getURL(url, function(content, error) {
              if(error != null) {
                load.textContent = error
              }else {
                load.textContent = ''
                let imgs = JSON.parse(content.responseText).slice(0,10)
                let i = 0
                function f() {
                  if(i < imgs.length) {
                    getImage(url + '/../' + imgs[i++].url, (img) => {
                      image.append(img)
                      f()
                    })
                  }
                }
                f()
              }
            })
          })

          down2.addEventListener('click', e => {
            load.textContent = '加载中...'
            let url = 'http://xieranmaya.github.io/images/cats/cats.json'
            getURL(url, function(content, error) {
              if(error != null) {
                load.textContent = error
              }else {
                load.textContent = ''
                let imgs = JSON.parse(content.responseText).slice(0,10)
                let q = new Queue()
                let i = 0
                for(let j = 0; j < imgs.length; j++) {
                  q.add((next) => {
                    getImage(url + '/../' + imgs[i++].url, (img) => {
                      image.append(img)
                      next()
                    })
                  })
                }
              }
            })
          })


          down.addEventListener('click', e => {
            load.textContent = '加载中...'
            let url = 'http://xieranmaya.github.io/images/cats/cats.json'
            getURL(url, function(content, error) {
              if(error != null) {
                load.textContent = error
              }else {
                load.textContent = ''
                let imgs = JSON.parse(content.responseText)
                for(let i = 0; i < imgs.length; i++) {
                  let ele = imgs[i]
                  let img = document.createElement('img')
                  img.src = url + '/../' + ele.url
                  //img.style.width = ele.width  + 'px'
                  //img.style.height = ele.height  + 'px'
                  image.appendChild(img)
                }
              }
            })
          })

        </script>
      `)
      conn.end()
      return
    }
  })
})
server.listen(port, ()=> {
  console.log(port)
})