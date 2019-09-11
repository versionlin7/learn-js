(function() {

  var seajs = {
    use: function(entryPath) {
      loadAll(entryPath, () => {
        require(entryPath)
      })
    },

  }
  window.seajs = seajs

  function require(path) {
    if(path in require.moduleCache){//require.moduleCache.hasOwnProperty(path)
      return require.moduleCache[path]
    }

    var code = cache[path]

    var modFunc = new Function('module, exports, require', code)
    var module = {exports: {}}

    require.moduleCache[path] = module.exports

    modFunc(module, module.exports, require)
    return module.exports
  }
  require.moduleCache = Object.create(null)
  var cache = {}

  /**
   * 给定文件路径，加载其内容及其依赖的所有文件的内容并缓存
   * 完成后调用callback
   * 用于通知调用者已经加载完成
   */
  function loadAll(path, callback) {//is-narcissistic.js
    readFile(path, (sourceCode) => {
      cache[path] = sourceCode
      let deps = getDeps(sourceCode)//['digit-width.js', 'power.js']
      if(deps.length === 0) {
        callback()
        return
      }
      let loadedCount = 0
      deps.forEach(dep => {
        loadAll(dep, () => {
          loadedCount++
          if(loadedCount == deps.length) {
            callback()
          }
        })
      });
    })
  }

  /**
   * 给定一份源代码， 返回其依赖
   * 即require调用的参数
   */
  function getDeps(sourceCode) {
    let requireCalls = sourceCode.match(/require\s*\(\s*(['"])([^'"]*)\1\s*\)/g)//带/g括号内的内容不会被收集

    if(requireCalls) {
      return requireCalls.map(call => {
        return call.match(/require\s*\(\s*(['"])([^'"]*)\1\s*\)/)[2]

      })
    }else {
      return []
    }
  }
  /**
   * 给定文件路径，加载完成后调用done
   * 并传入文件内容
   */
  function readFile(path, done) {
    let xhr = new XMLHttpRequest()
    xhr.open('get', path)
    xhr.addEventListener('load', () => {
      done(xhr.responseText)
    })
    xhr.send()
  }
}())