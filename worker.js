addEventListener('message', e => {
  console.log(e.data)

  postMessage(e.data * e.data)
})