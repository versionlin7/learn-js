function promisify(callbackBasedFunction) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      callbackBasedFunction(...args, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }
}

function callbackify(promiseBased) {
  return function(...args) {
    var cb = args.pop()
    promiseBased(...args).then(val => {
      cb(null, val)
    }, reason => {
      cb(reason)
    })
  }
}