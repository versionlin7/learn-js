// define (function(module, exports, require){

  var digitWidth = require('digit-width.js')
  var power = require('power.js')
  
  module.exports = function isNarcissistic(n) {
    var m = n
    var width = digitWidth(n)
    var sum = 0
    while(n > 0) {
      var digit = n % 10
      sum += power(digit, width)
      n = (n - digit) / 10
    }
    return sum == m
  }
// })