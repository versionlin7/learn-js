let fs = require('fs')
let fsp = fs.promises
let dirPath = 'E:/chromeD/x'
/**
 * 接收一个文件夹路径，返回这个文件夹里面的所有文件名
 * 需要递归的得到所有的文件名 并放在一个一维数组里返回
 * 需要写三个版本：
 * 同步版
 * 回调版
 * Promise版本
 */
function listAllFilesSync(dirPath) {
  if(fs.statSync(dirPath).isDirectory()){
    let list = []
    list.push(dirPath)
    fs.readdirSync(dirPath).forEach((path) => {
      let nextPath = dirPath +'/'+ path
      list.push([].concat(...listAllFilesSync(nextPath)))
    })
    return list
  }else {
      return [].concat(dirPath)
  }
}


function listAllFilesCallback(path, callback) {
  fs.stat(path, (err, stats) => {
    if(stats.isDirectory()) {
      fs.readdir(path, {withFileTypes: true},(err, entries) => {
        var result = []
        var count = 0
        // if(entries.length == 0) {
        //   callback([path])
        // }else {
          entries.forEach((entry, i) => {
            var fullPath = path + '/' + entry.name
            listAllFilesCallback(fullPath, (files) => {
              result[i] = files
              count++
              if(count == entries.length) {
                callback([].concat(...result))
              }
            })
          })
        // }
      })
    }else {
      callback([path])
    }
  })
}


function listAllFilesPromise(dirPath) {
    return fsp.stat(dirPath).then(stats => {
      if(stats.isDirectory()) {
        return fsp.readdir(dirPath).then(entries => {
          return Promise.all(entries.map(entry => {
              let fullPath = dirPath + '/' + entry
              return listAllFilesPromise(fullPath)
            }))
        }).then(arrays => {
          return [].concat(...arrays)
        })
      }else {
        return [dirPath]
      }
    })
}

async function listAllFilesCall(path) {
  var result = []
  let stat = await fsp.stat(path)
  if(stat.isFile()) {
    return [path]
  }else {
    let entries = await fsp.readdir(path)
    if(entries.length) {
      for(let entry of entries) {
        let fullPath = path + '/' + entry
        let files = await listAllFilesCall(fullPath)
        result.push(...files)
      }
    }else {
      result.push(path)
    }
    return result
  }
}



async function listAllFiles2(path) {
  var result = []
  let stat = await fsp.stat(path)
  if(stat.isFile()) {
    return [path]
  }else {
    let entries = await fsp.readdir(path)
    if(entries.length) {
      let entryPromises = entries.map(entry => {
        let fullPath = path + '/' + entry
        return listAllFiles(fullPath)
      })
      for(let entryPromise of entryPromises) {
        let files = await entryPromise
        result.push(...files)
      }
    }else {
      result.push(path)
    }
    return result
  }
}

async function listAllFiles(path) {
  var result = []
  let stat = await fsp.stat(path)
  if(stat.isFile()) {
    return [path]
  }else {
    let entries = await fsp.readdir(path)
    if(entries.length) {
      let entryPromises = entries.map((entry,i) => {
        let fullPath = path + '/' + entry
        return listAllFiles(fullPath).then(files => {
          result[i] = files
        })
      })
      await Promise.all(entryPromises)
      return [].concat(...result)
    }else {
      result.push(path)
    }
    return result
  }
}

// listAllFiles(dirPath).then(console.log)


listAllFilesCallback(dirPath, (x)=>console.log(x.toString()))

// let file = listAllFilesPromise(dirPath)
// file.then((val) => {
//   console.log(val)
// })

// let files = listAllFilesSync(dirPath)
// console.log(files.toString().split(','))




