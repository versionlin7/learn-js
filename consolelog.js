function runCode(code) {//'runCode = 8; logs = 9'
	var logs = []
	var console = {
		log: function(...args){
			var time = Date.now()
			logs.push([time, args])
		}	
	}
	var globalEval = eval
	var result = globalEval(code)
	output(logs, result)
}
