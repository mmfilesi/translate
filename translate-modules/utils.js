'use strict';


const glob 		= require('glob');
const fs 			= require('fs');

const config 	= require('./config');
const msg 		= require('./msg');

const utils = ( ()=> {
	let module 	= {};

	module.deleteTranslateFolder = ()=> {
		let deletePromise = new Promise((resolve, reject) => {

			glob(`${config.getPaths().translation}*.json`, (err, files)=> {
				if (err) {
					throw err;
					reject(err);
				}
				files.forEach( (item, index, array)=> {
					fs.unlinkSync(item, function(err){
						if (err) {
							throw err;
						}
					});
				});
				msg.info('old translate deleted');
				resolve();
			});

		});

		return deletePromise;
	};

	module.cleanChars = (sourceString)=> {
		// todo.
		return sourceString;
	};

	return {
		deleteTranslateFolder: 	module.deleteTranslateFolder,
		cleanChars: 						module.cleanChars
	};

} )();

module.exports = utils;