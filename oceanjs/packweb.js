var fs = require('fs')
var entry = "./main.js"
var modFuncCache = {}
loadAll(entry)
var modulesMapSource = JSON.stringify(modFuncCache, function(key, val) {
  if(typeof val === 'function') {
    return "####" +val.toString() + "####"
  }else {
    return val
  }
}, 2).replace(/"####|####"/g, '')
     .replace(/\\r\\n/g,'\r\n')
     .replace(/\\n/g,'\n')
     .replace(/\\r/g,'\r')
     .replace(/\\t/g,'\t')

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
  var moduleCache = {}//模块导出对象缓存
  var modFuncCache = ${modulesMapSource}//模块函数缓存
}())
  require("${entry}")
`

fs.writeFileSync('bundle.js', outputPackedSourceCode)


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
  let requireCalls = sourceCode.match(/require\s*\(\s*(['"])([^'"]*)\1\s*\)/g)//带/g括号内的内容不会被收集

  if(requireCalls) {
    return requireCalls.map(call => {
      return call.match(/require\s*\(\s*(['"])([^'"]*)\1\s*\)/)[2]
    })
  }else {
    return []
  }
}



