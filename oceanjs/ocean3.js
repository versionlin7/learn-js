(function() {

  var seajs = {
    use: function(entryPath) {
      // loadAll(entryPath, () => {
        require(entryPath)
      // })
    }
  }

  window.seajs = seajs

  function require(path) {
    if (moduleCache[path]) {
      return moduleCache[path]
    }
    var modFunc = modFuncCache[path]
    // var modFunc = new Function('module, exports, require', code)
    var module = {exports: {}}
    modFunc(require, module.exports, module)
    moduleCache[path] = module.exports
    return module.exports
  }

  var moduleCache = {}//模块导出对象的缓存
  //模块函数的缓存
  var modFuncCache = {
    "main.js": function(require, exports, module) {
        var isNarcissistic = require('is-narcissistic.js')
    
      for(var i = 1; i < 1000; i++) {
          if (isNarcissistic(i)) {
            console.log(i)
        }
      }
    },
    "is-narcissistic.js": function(require, exports, module){
      
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
    },
    "digit-width.js": function(require, exports, module){
      
      module.exports = function digitWidth(n) {
          if (n == 0) {
            return 1
        }
        var c = 0
        while(n > 0) {
            c++
          n = Math.floor(n / 10)
        }
        return c
      }
    },
    "power.js": function(require, exports, module){
      
      module.exports = function power(x, n) {
          return Math.pow(x, n)
      }
    }
  }

}())

