function curry(f, length = f.length) {
  return function(...args) {
    if(args.length >= length) {
      return f(...args)
    }else {
      return curry(f.bind(null, ...args), length-args.length)
    }
  }
}