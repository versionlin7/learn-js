function compose(func) {
  return function(...args) {
    let res = []
    for(let i = 0; i < args.length; i++){
      let  value = func[0](args[i])
      for(let j = 1; j < func.length; j++){
        value = func[j](value)
      }
      res.push(value)
    }
    return res
  }
}

//############################
f = compose([it => it * it, it => it + 1, it => 2 * it])
f(5)
