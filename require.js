function require(path) {
  if(path in require.moduleCache){//require.moduleCache.hasOwnProperty(path)
    return require.moduleCache[path]
  }
  var fileContent = new readFile(path)
  var moduleFunction = new Function('module, exports', fileContent)
  
  var module = {exports:{}}
  require.moduleCache[path] = module.exports//在创建后直接存起来避免循环依赖爆栈


  moduleFunction(module, module.exports)
  return module.exports
}
require.moduleCache = Object.create(null)

function readFile(path) {
  var xhr = XMLHttpRequest()
  xhr.open('GET', path, false)
  xhr.send()
  return xhr.responseText
}