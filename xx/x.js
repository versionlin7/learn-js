const {createReadStream, createWriteStream} = require('./file-read-stream')
createReadStream('./a.html').pipe(createWriteStream('./aa.js'))