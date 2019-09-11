// define(function(module, exports, require) {

  let isNarcissistic = require('is-narcissistic.js')

  for(let i = 1; i < 1000; i++) {
    if(isNarcissistic(i)) {
      console.log(i)
    }
  }
// })