//debounce
var timeId = null
window.addEventListener('mousedown', e => {
  clearTimeout(timeId)
  timeId = setTimeout(() => { update }, 200);
})


window.addEventListener('mousemove', debounce(function(e){
  update()
}, 200))

function debounce(f, duration) {
  var timeId = null
  return function(...args) {
    clearTimeout(timeId)
    timeId = setTimeout(() => { f.call(this, ...args) }, duration)
  }
}
//throttle###############################
var lastTime = 0
window.addEventListener('mousemove', e => {
  var date = Date.now()
  if(date - lastTime > 300) {
    console.log(1)
    lastTime = date
  }
})

window.addEventListener('mousemove', throttle(() => {
  console.log(1)
}, duration))

function throttle(f, duration) {
  var timeId = null
  var lastTime = 0
  return function(...args) {
    clearTimeout(timeId)
    
    var now = Date.now()
    if(now - lastTime > duration) {
      
      f(...args)
      lastTime = now
    }else {
      
      timeId = setTimeout(() => {
        f(...args)
        lastTime = now
      }, duration);
    }
  }
}



var scheduled = false;
var lastEvent
addEventListener("mousemove", function(event) {
  lastEvent = event
  if(!scheduled) {
    scheduled = true
    this.setTimeout(function() {
      scheduled = false
      f(event)
    }, 250)
  }
})


function throttle(fn, time) {
  let preTime = 0
  return () => {
    if (time <= Date.now() - preTime) {
      fn()
      preTime = Date.now()
    }
  }
}