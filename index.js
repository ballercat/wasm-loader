var fs = require('fs');
var bootstrap = fs.readFileSync(__dirname + '/output.js', 'utf8');
var loaderUtils = require('loader-utils');
var wasmDCE = require('wasm-dce')

var config = {dce: true};

module.exports = function(buffer) {
  var params = loaderUtils.parseQuery(this.resourceQuery);

  if (params.dce === '1') {
    // FIXME(sven): get the used exports
    var usedExports = [];

    buffer = wasmDCE(buffer, usedExports);
  }

  var out = "var buffer = new ArrayBuffer(" + buffer.length + ");";
  out += "var uint8 = new Uint8Array(buffer);";
  out += "uint8.set([";
  for(var i = 0; i < buffer.length; i++) {
    out += buffer[i] + ","
  }
  out += "]);"
  out += bootstrap;

  this.callback(null, out);
};

module.exports.raw = true;

