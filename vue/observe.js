function watch(obj, f) {
  let updateScheduled = false
  return observe(obj)
  function observe (obj) {
    for(let key in obj) {
      let val  = obj[key]
      if(typeof val == 'object') {
        val = observe(val)
      }
      Object.defineProperty(obj , key, {
        get: function() { 
          //  console.log('getting'+ val)
          return val
        },
        set: function(value) {
          if(value == val) return
          if(!updateScheduled) {
            Promise.resolve().then(() => {
              updateScheduled = false
              f(obj)
            })
            updateScheduled = true
          }
          if(typeof value == 'object') {
            value = observe(value)
          }
          val = value ;
          // return console.log('setting' + key + 'to' + val)
        }
      })
    }
    return obj
  }
}

let obj = {
  a: 1,
  b: 2,
  c: {
    x: 1,
    y: 2,
  }
}
obj.a = 1//will log 'setting a to 1'
obj.a //will log 'getting a'