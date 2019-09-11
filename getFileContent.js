function getFileContent(file, done) {
  var reader = new FileReader()
  reader.addEventListener('load', function() {
    done(reader.result)
  })
  reader.readAsText(file)
}


getFileContent(file, function(result) {
  console.log(result)
})