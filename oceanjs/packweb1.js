var fs = require('fs')

var entry = 'main.js'

var modFuncCache = {}

loadAll(entry)


var outputPackedSourceCode = `
(function() {

  function require(path) {
    if (moduleCache[path]) {
      return moduleCache[path]
    }
    var modFunc = modFuncCache[path]
    var module = {exports: {}}
    modFunc(require, module.exports, module)
    moduleCache[path] = module.exports
    return module.exports
  }

  var moduleCache = {}//模块导出对象的缓存
  //模块函数的缓存
  var modFuncCache = ${ getObjSource(modFuncCache) }

  require("${ entry }")

}())

`

fs.writeFileSync('bundle.js', outputPackedSourceCode)

function getObjSource(obj) {
  var objSource = '{'
  for (var key in obj) {
    var val = obj[key]
    objSource += '"' + key + '"' + ':' + val.toString() + ',\n'
  }
  objSource = objSource.slice(0, -2)
  objSource += '}'
  return objSource
}

function loadAll(path) {
  var code = fs.readFileSync(path).toString()
  var modFunc = new Function('require, exports, module', code)
  modFuncCache[path] = modFunc
  var deps = getDeps(code)
  deps.forEach(dep => {
    loadAll(dep)
  })
}

function getDeps(sourceCode) {
  var requireCalls = sourceCode.match(/require\s*\(\s*(['"])([^'"]*)\1\s*\)/g)

  if (requireCalls) {
    return requireCalls.map(call => {
      return call.match(/require\s*\(\s*(['"])([^'"]*)\1\s*\)/)[2]
    })
  } else {
    return []
  }
}

