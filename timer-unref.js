

new URL('https://www.baidu.com')


fs = require('fs')

fs.readFile('aa', (err, data) => {
  console.log(1)
})


var id = setInterval(() => {
  console.log(2)
}, 1000)

id.unref()//让该timer的未执行状态不影响程序的结束

id.ref()
