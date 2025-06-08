var url   = require('./url'),
    utils = require('stylus').utils;

function plugin(options) {

  var defaults = {
    strategy: 'timestamp',
    paths: [],
    rename: false
  };

  return function(stylus) {
    options = options || {};
    options = utils.merge(defaults, options);
    options.paths = options.paths.concat(stylus.options.paths);

    stylus.define('url', url(options));
  };
}

module.exports = plugin;
module.exports.version = '0.0.1';