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

new Queue()
.add(function f(next){
  console.log(1)
  setTimeout(()=> {
    next()
  },1000)
}).add(function f2(next) {
  console.log(2)
  setTimeout(() => {
    next()
  }, 1000)
})