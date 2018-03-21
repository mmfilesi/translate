'use strict';

const argv = require('yargs').argv;

const generalConfig = {};

generalConfig.lang = argv.lang || 'en';

const config = ( ()=> {
	let module 				= {};

  module.getPaths = ()=> {
    let paths = {};

    paths.translation = './translations/';
    paths.csv         = './csv/clTranslate.csv';
    paths.errors      = './errors/';

    return paths;
  };

  module.getLang = ()=> {
    return generalConfig.lang;
  };

	return {
		getPaths: 	          module.getPaths,
    getLang:              module.getLang
	};

} )();

module.exports = config;

