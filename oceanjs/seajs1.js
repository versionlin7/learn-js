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

    // var code = cache[path]
    var modFunc = modFuncCache[path]
    // var modFunc = new Function('module, exports, require', code)
    var module = {exports: {}}

    require.moduleCache[path] = module.exports

    modFunc(module, module.exports, require)
    return module.exports
  }
  require.moduleCache = Object.create(null)//模块导出对象缓存
  var cache = {}//模块源代码缓存
  var modFuncCache = {}//模块函数缓存
  /**
   * 给定文件路径，加载其内容及其依赖的所有文件的内容并缓存
   * 完成后调用callback
   * 用于通知调用者已经加载完成
   *
   * @param   {[type]}  path      [path description]
   * @param   {[type]}  callback  [callback description]
   *
   * @return  {[type]}            [return description]
   */
  function loadAll(path, callback) {//is-narcissistic.js
    
    readFile(path, (moduleFunc) => {
      modFuncCache[path] = moduleFunc
      let deps = getDeps(moduleFunc.toString())//['digit-width.js', 'power.js']
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
   *
   * @param   {string}  sourceCode  
   *
   * @return  {[type]}              依赖文件名路径
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


  var moduleFunc
  window.define = function(f) {
    moduleFunc = f
  }

  function readFile(path, done) {
    var script = document.createElement('script')
    script.onload = function () {
      document.head.removeChild(script)
      done(moduleFunc)
    }
    script.src = path
    document.head.appendChild(script)
  }
}())