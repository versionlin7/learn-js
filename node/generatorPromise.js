

run(function * foo() {
  let a = yield Promise.resolve(3)
  console.log(a)
  let b = yield 3
  console.log(b)
})

function run(generatorFunc) {
  return new Promise((resolve, reject) => {
    let iterable = generatorFunc()
    var generated
    try {
      generated = iterable.next()
    } catch (error) {
      reject(error)
    }
    step()
    function step() {
      if(!generated.done){
        generated.value.then(val => {
          try {
            generated = iterable.next(val)
          } catch (error) {
            reject(error)
          }
          step()
        }, reason => {
          try {
            generated = iterable.throw(reason)
          } catch (error) {
            reject(error)
          }
          step()
        })
      }else {
        Promise.resolve(generated.value).then(resolve, reject)
      }
    }
  })
}

function run(f) {
  new Promise.resolve((resolve, reject) => {
    var iter = f()
    var gen 
    try {
      gen = iter.next()
    } catch (error) {
      reject(error)
    }
    step()
    function step() {
      if(gen.done) {
        Promise.resolve(gen.value).then(resolve, reject)
      }else {
        if(gen.value == Promise) {
          gen.value.then((val) => {
            try {
              gen = iter.next(val)
              step()
            } catch (error) {
              reject(error)
            }
          }, reason => {
            try {
              gen = iter.throw(reason)
              step()
            } catch (error) {
              reject(error)
            }
          })
        }else if(gen.value == Generator ){
          run(gen.value)
        }
      }
    }
  })
}