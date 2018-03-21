const clc = require('cli-color');

const msg = ( ()=> {
	let module 	= {};

	module.showError = (error)=> {
		console.log(clc.red('error ::', error));
		process.exit(1);
	};

	module.info = (msg)=> {
		console.log(clc.blue(msg));
	};

	module.warning = (msg)=> {
		console.log(clc.yellow(msg));
	};

	module.success = (msg)=> {
		console.log(clc.green(msg));
	};

	return {
		showError: module.showError,
		info: module.info,
		warning: module.warning,
		success: module.success
	};

} )();

module.exports = msg;