Promise.resolve = function(val) {
  return new Promise(resolve => {
    resolve(val)
  })
}
Promise.reject = function(val) {
  return new Promise((resolve, reject) => {
    reject(val)
  })
}
Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected)
}

Promise.all = function(promises) {
  return new Promise((resolve, reject) => {
    let result = []
    let resolveCount = 0
    for(let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(val => {
        result[i] = val
        resolvedCount++
        if(resolveCount == promises.length) {
          resolve(result)
        }
      }, reason => {
        reject(reason)
      })
    }
  })
}

Promise.race = function(values) {
  return new Promise((resolve, reject) => {
    for(let i = 0; i < values.length; i++) {
      Promise.resolve(values[i]).then(val => {
        resolve(val)
      }, reason => {
        reject(reason)
      })
    }
  })
}

//============

function resolvePromise(promise, x, resolve, reject) {
  if(x === promise) {
    reject(new TypeError())
    return
  }

  if(x instanceof MyPromise) {
    x.then(resolve, reject)
    return
  }

  if(x && typeof x == 'object' || typeof x == 'function') {
    let then 
    try {
      then = x.then//x.then may be a getter
    }catch(e) {
      reject(e)
      return
    }

    if(typeof then === 'function') {
      let called = false
      try{
        then.call(x, function ResolvePromise(y) {
          called = true
          resolvePromise(promise, y, resolve, reject)
        },function rejectPromise(r) {
          called = true
          reject(r)
        })
      }catch(e) {
        if(!called) {
          reject(e)
        }
      }
    }else {
      resolve(x)
    }
  }else {
    resolve(x)
  }
}

//========================
//example
var urls = [1,2,3,4]
function getJSON(url) {
  return new Promise((resolve) => {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', 'xxx')
    xhr.onload = function() {
      resolve(JSON.parse(xhr.responseText))
    }
    xhr.send()
  })
}
//1. =========串行
var result = Promise.resolve()
urls.forEach(url => {
  result = result.then(() => {
    return getJSON(url)
  }).then((picture) => {
    addHtml(picture)
  })
})
//2. ===========串行
urls.reduce(function(seq, url) {
  return seq.then(function() {
    return getJSON(url)
  }).then((picture) => {
    addHtml(picture)
  })
}, Promise.resolve())
//3. =============并行
Promise.all(urls.map(getJSON))
.then((pictures) => {
  pictures.forEach(picture => {
    addHtml(picture)
  })
})s
//4. =============并行加载串行显示
let pictures = Promise.all(urls.map(getJSON))
pictures.reduce((seq, picture) => {
  return seq
    .then(() => picture)
    .then((picture) => {
      addHtml(picture)
    })
}, Promise.resolve())
