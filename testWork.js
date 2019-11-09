const ts = Date.now();
const code = `
let i = 100
while (i--) 
postMessage(new Date())
`
const js = new Blob([code], { type: 'text/javascript' })
const ur = URL.createObjectURL(js);
const recv = (ev) => { console.log('receive:', ev.data - ts) }
const timer = () => { console.log('timer:', Date.now() - ts) }
const worker = new Worker(ur)
timer()
setTimeout(timer, 10)
worker.addEventListener('message', recv, false)