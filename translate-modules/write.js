'use strict';

const fs 	    = require('fs');

const msg 	  = require('./msg');
const config 	= require('./config');

const write = ( ()=> {
	let module = {};

	module.writeTranslation = (_content_, codeLang)=> {
    let writePromise = new Promise((resolve, reject) => {
      let content = JSON.stringify(_content_);

      fs.writeFile(`${config.getPaths().translation}${codeLang}.json`, content,  (err)=> {
        if (err) {
          msg.showError(err);
          reject(err);
        }
        msg.info(`Translate ${codeLang} written successfully!`);
        resolve();
      });

    });

    return writePromise;
  };

  // fixme: es mejor unificar con la anterior y hacer una universal
	module.writeErrors = (_content_, codeLang)=> {
    let writePromise = new Promise((resolve, reject) => {
      let content = _content_.join('\n');

      fs.writeFile(`${config.getPaths().errors}${codeLang}.json`, content,  (err)=> {
        if (err) {
          msg.showError(err);
          reject(err);
        }
        resolve();
      });

    });

    return writePromise;
	};

	return {
    writeTranslation:   module.writeTranslation,
    writeErrors:        module.writeErrors
	};

} )();

module.exports = write;
