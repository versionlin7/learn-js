function getU(url, acceptHead, callback) {
  let xhr = new XMLHttpRequest()
  xhr.open('GET', url)
  xhr.setRequestHeader('Accept',acceptHead)
  xhr.addEventListener('load', ()=> {
    callback(xhr.responseText)
  })
  xhr.send()
}

getU('https://eloquentjavascript.net/author', 'text/plain', console.log)
getU('https://eloquentjavascript.net/author', 'text/html', console.log)
getU('https://eloquentjavascript.net/author', 'text/json', console.log)