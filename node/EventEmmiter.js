class EventEmitter {
  constructor() {
    this._events = {}
  }

  on(type, handler) {//addEventListener
    if(type in this._events) {
      this._events[type].push(handler)
    }else {
      this._events[type] = [handler]
    }
    return this
  }

  off(type, handler) {//removeEventListener
    let listeners = this._events[type]
    
    this._events[type] = listeners.filter(it => it != handler)
    
    // if(listeners) {
    //   let idx = listeners.indexOf(handler)//-1
    //   listeners.splice(idx, 1)//idx = -1 result error
    // }
    return this
  }

  emit(type, ...args){//dispatchEvent
    let listeners = this._events[type]
    if(listeners) {
      for (let i = 0; i < listeners.length; i++) {
        let handler = listeners[i]
        handler.call(this, ...args)
      }
    }
  }
}


var emitter = new EventEmitter()
emitter.on('foo', () => {

})
emitter.emit('foo')



class slider extends EventEmitter {
  constructor() {

  }
  next() {

  }
}
var s = new slider()
s.on('next', () => {
  
})

//################################
class HttpServer extends EventEmmiter {
  constructor(){
    this.tcpServer = new net.Server()

    this.tcpServer.on('connection', conn => {
      conn.on('data', data => {
        if (data is a http request) {
          var httpRequest = parse(data)
          var httpResponse = new 
          this.emit('request', httpRequest, httpResponse)
        }
      })
    })
  }



}


function createServer(requestHandler, options) {
  var server = new http.Server(options)
  server.on('request', requestHandler)
  return server
}


server = http.createServer()

server.on('request', (req, res) => {

})
