function spreadGenerator(generator) {
	var result = []
	var generated = generator.next()
	while(!generated.done) {
		result.push(generated.value)
		generated = generator.next()
    }
	return result 
}
function spreadGenerator(generator) {
	var result = []
	for(var val of generator) {
		result.push(val)
	}
	return result 
}


function forof(generator, action) {
	var generated = generator.next()
	while(!generated.done) {
		if (action(generated.value) === false) {
			generator.return()
			break
		}
		generated = generator.next()
    }
}

Number.prototype[Symbol.iterator] = function*(){
	for(var i = 1; i <= this; i++) {
		yield i  
    }
}

for(var i of 10) {
	console.log(i)
}


//TODO:在for之前增加代码以让for循环可以输出 9 1 2 3



for(var digit of 3219..digits()) {
	console.log(digit)
}


Number.prototype[Symbol.iterator] = function(){
	var i = 0
	return {
		next: () => {
			return {
				value: ++i,
				done: i > this
            }
        }
    }
}
