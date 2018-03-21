'use strict';

const csv         = require('csvtojson')
const objectPath  = require('object-path');

const utils 			= require('./translate-modules/utils');
const config 			= require('./translate-modules/config');
const msg 				= require('./translate-modules/msg');
const write 			= require('./translate-modules/write');


/* ============================================
	Init
============================================= */



const bootstrap = ( ()=> {
  let module 	    = {};
  let self        = module;
  let codeLang    = 'en';
  let fileErrors  = [];
  let langs       = {};

	module.init = ()=> {
    msg.info('translate builder :: start proccess');

    self.initLang();
		utils.deleteTranslateFolder().then( ()=> {
      self.getInitialData();
		});
  };

  module.initLang = ()=> {
    codeLang        = config.getLang();
    langs[codeLang] = {};
  };

	module.getInitialData = ()=> {
    let counter = 1;

    csv()
      .fromFile(`${config.getPaths().csv}`)
      .on('json',(jsonObj)=> {
        let check;

        if (jsonObj) {
          check = self.checkIsCorrect(jsonObj, counter);

          if ( !check.hasError ) {
            self.prepareObject(jsonObj.literal, jsonObj[codeLang], codeLang);
          } else {
            msg.warning(counter + ' ' + check.msg);
          }
          counter++;
        }

      })
      .on('done', (e)=> {
        self.launchWriter();
        msg.info('csv read.');
      });
  };

  module.checkIsCorrect = (jsonObj, counter)=> {
    let msg       = '';
    let hasError  = false;

    if (!jsonObj.literal) {
      msg += ' Dont have literal.';
      hasError = true;
    }

    if (!jsonObj[codeLang]) {
      msg += ' Dont have translation.';
      hasError = true;
    }

    if (hasError) {
      msg = `ERROR - file ${counter}:${msg}`;
      fileErrors.push(msg);
    }

    return {hasError: hasError, msg};
  };

  module.prepareObject = (_translatePath_, translation, codeLang)=> {
    let translatePath = _translatePath_.replace(' ', '_').toUpperCase();

    // todo
    translatePath = utils.cleanChars(translatePath);

    objectPath.set(langs[codeLang], translatePath, translation);
  };

  module.launchWriter = ()=> {
    write.writeTranslation(langs, 'en').then(()=> {
      self.endProcess();
    });
  };

	module.endProcess = ()=> {
    if (!fileErrors.length) {
		  msg.success('translate done, ^^');
      process.exit();
    } else {
      write.writeErrors(fileErrors, codeLang).then(()=> {
        msg.warning('done with errors. See log, please');
        process.exit();
      });
    }
	};

	return {
		init: module.init,
		endProcess: module.endProcess
	};

} )();


bootstrap.init();