const http = require('http')
// const server = http.createServer()
const fs = require('fs')
const fsp = fs.promises
const path = require('path')
const queryString = require('querystring')
//const mime = require('mime')//npm i mime
//let type = mime.getType(targetPath)
const port = 9090
//process.cwd()
//path.resolve('./')
const based = './'//相对于node运行时的当前文件夹
const baseDir = path.resolve(__dirname) //'./'当前文件所在文件夹

var mimeMap = {
  '.jpg': 'image/jpeg',
  '.html': 'text/html',
  '.css': 'text/stylesheet',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.txt': 'text/plain',

}

// let server = http.createServer((req,res)=> {
//   console.log(req.method, req.url)

//   var targetPath = path.join(baseDir, req.url)

//   fs.stat(targetPath, (err, stat) => {
//     if(err){
//       res.writeHead(404, {
//         'Content-type': 'text/html; charset=UTF-8'
//       })
//       res.end('404 not Found')
//     }else {
//       if(stat.isFile()) {
//         fs.readFile(targetPath, (err, data) => {
//           res.writeHead(502, {
//             'Content-Type': 'text/html; charset=UTF-8'
//           })
//           if(err) {
//             console.log(502)
//             res.end('502 Internal Server Error')
//           }else {
//             res.end(data)
//           }
//         })
//       }else if (stat.isDirectory()){
//         var indexPath = path.join(targetPath, 'index.html')
//         fs.stat(indexPath, (err, stat) => {
//           if(err) {
//             if(!req.url.endsWith('/')) {//如果地址栏里不以/结尾，跳转到以/结尾
//               res.writeHead(301, {
//                 'Location': req.url+'/'
//               })
//               res.end()
//               return 
//             }
//             fs.readdir(targetPath, {withFileTypes:true}, (err, entries) => {
//               res.writeHead(200, {
//                 'Content-type': 'text/html; charset=UTF-8'
//               })
//               res.end(`
//                 ${
//                   entries.map(entry => {
//                     let slash = entry.isFile()? '': '/'
//                     return `
//                       <div> 
//                         <a href="${entry.name + slash}">${entry.name + slash}</a>
//                       </div>
//                     `
//                   }).join('')
//                 }
//               `)
//             })
//           }else {
//             fs.readFile(indexPath, (err, data) => {
//               res.writeHead(200, {
//                 'Content-type': 'text/html; charset=UTF-8'
//               })
//               res.end(data)
//             })
//           }
//         })
//       }
//     }
//   })

// })


const server = http.createServer(async (req, res) => {
  console.log(req.method, req.url)
  // let targetPath = path.join(baseDir, req.url)
  let targetPath = decodeURIComponent(path.join(baseDir, req.url))//用于中文路径解码
  
  if(!targetPath.startsWith(baseDir)) {
    res.end()
    return
  }
  //path.sep当前系统的路径分隔符
  //if(targetPath.split('/').some(seg => seg.startsWith('.'))) {
  if(targetPath.split(path.sep).some(seg => seg.startsWith('.'))) {
    res.end()
    return
  }
  
  try {
    let stat = await fsp.stat(targetPath)
    if(stat.isFile()) {
      // let data = await fsp.readFile(targetPath)
      let type = mimeMap[path.extname(targetPath)]
      if(type) {
        res.writeHead(200, {
          'Content-type': `${type}; charset=UTF-8`
        })
      }else {
          res.writeHead(200, {
            'Content-type': 'application/octet-stream'
          })
      }
      // res.end(data)
      fs.createReadStream(targetPath).pipe(res)
    }else if(stat.isDirectory()){
      let indexPath = path.join(targetPath, 'index.html')
      try {
        await fsp.stat(indexPath)
        // let indexContent = await fsp.readFile(indexPath)
        let type = mimeMap[path.extname(indexPath)]
        if(type) {
          res.writeHead(200, {
            'Content-type': `${type}; charset=UTF-8`
          })
        }else {
            res.writeHead(200, {
              'Content-type': 'application/octet-stream'
            })
        }
        fs.createReadStream(indexPath).pipe(res)
        // res.end(indexContent)
      } catch (error) {//index.html不存在
        if(!req.url.endsWith('/')) {
          res.writeFead(301, {
            'Location': req.url + '/'
          })
          res.end()
          return 
        }
        let entries = await fsp.readdir(targetPath, {withFileTypes:true})
        res.writeHead(200, {
          'Content-type': 'text/html; charset=UTF-8'
        })
        res.end(`
          ${
            entries.map(entry => {
              if(entry.name.startsWith('.')) {
                return 
              }
              let slash = entry.isFile()? '': '/'
              return `
                <div> 
                  <a href="${entry.name + slash}">${entry.name + slash}</a>
                </div>
              `
            }).join('')
          }
        `)
      }
    }
  } catch (error) {
    res.writeHead(404, {
      'Content-type': 'text/html; charset=UTF-8'
    })
    res.end('404 Not Found')
  }
})


server.listen(port, () => {
  console.log('success link'+ port)
}) 