function asyncMap(ary, asyncMapper, callback) {
  let result = []
  let count = 0
  for(let i = 0; i < ary.length; i++) {
    asyncMapper(ary[i], (err, mapped) => {
      count++
      result[i] = mapped
      if(count == ary.length) {
        callback(null, result)
      }
    })
  }
}

asyncMap([1,2,3,4], function(val, callback) {
  setTimeout(() => {
    callback(null, val * val)
  },Math.random() * 2000)
}, function(err, result) {
  console.log(result)
})

//====================
