const path = require('path');

/**
 * method to let tests runnning with assets inside the code
 *
 * @type {Object}
 */
module.exports = {
  process(src, filename, config, options) {
    return 'module.exports = ' + JSON.stringify(path.basename(filename)) + ';';
  }
};
