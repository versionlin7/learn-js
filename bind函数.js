function bind(f, ...arg) {
  return function(...args) {
    return f(...arg,...args)
  }
}

function bind(f) {
  var fixedArgs = [].slice.call(arguments)
  return function() {
    var args = [].slice.call(arguments)
    return f.apply(null, fixedArgs.concat(args))
  }
}
function a(a,b,c) {
  return a + b + c
}
function bind(f) {
  var fixedArgs = Array.from(arguments).slice(1)
  return function() {
    var args = Array.from(arguments)
    return f.apply(null, fixedArgs.concat(args))
  }
}

console.log(a(1,2,3))




function bin(f, thisArg, ...fixedArgs) {
  return function(...args) {
    console.log(this)
    return f.call(thisArg, ...fixedArgs,...args)
  }
}

function f(a, b) {return this + a + b }


if (!Function.prototype.softBind) {
  Function.prototype.softBind = function(obj) {
    var fn = this;
  // 捕获所有 curried 参数
    var curried = [].slice.call( arguments, 1 );
    var bound = function() {
      return fn.apply(
        (!this || this === (window || global)) ?obj : this 
        ,curried.concat.apply( curried, arguments )
      );
    };
    bound.prototype = Object.create( fn.prototype );
      return bound;
    };
  }