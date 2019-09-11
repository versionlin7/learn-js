(function() {

  var seajs = {
    use: function(entryPath) {
        require(entryPath)
    },
  }
  window.seajs = seajs
  function require(path) {
    if(path in require.moduleCache){//require.moduleCache.hasOwnProperty(path)
      return require.moduleCache[path]
    }
    // var code = cache[path]
    var modFunc = modFuncCache[path]
    // var modFunc = new Function('module, exports, require', code)
    var module = {exports: {}}

    require.moduleCache[path] = module.exports

    modFunc(module, module.exports, require)
    return module.exports
  }
  require.moduleCache = Object.create(null)//模块导出对象缓存
  var modFuncCache = {
    "main.js": function(module, exports, require) {
      
      let isNarcissistic = require('is-narcissistic.js')
    
      for(let i = 1; i < 1000; i++) {
          if(isNarcissistic(i)) {
            console.log(i)
        }
      }
    },
    "is-narcissistic.js": function(module, exports, require){
      
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
    "digit-width.js": function(module, exports, require) {
        module.exports = function digitWidth(n) {
          if(n == 0) {
            return 1
        }
        var c = 0
        while(n > 0) {
            c++
          n = Math.floor(n / 10)
        }
        return  c
      }
    },
    "power.js": function(module, exports, require) {
        module.exports = function power(x, n) {
          return Math.pow(x, n)
      }
    }
  }//模块函数缓存
 
}())

/**
 * JSON.stringify(temp1, function(key, val) {
	if(typeof val == 'function') {
		return val.toString()
    }else {
		return val 
    }
},2)
 */