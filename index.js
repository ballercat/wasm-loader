var fs = require('fs');
var bootstrap = fs.readFileSync(__dirname + '/output.js', 'utf8');
var loaderUtils = require('loader-utils');
var wasmDCE = require('wasm-dce')

module.exports = function(buffer) {

  var params = {};

  if (this.resourceQuery !== "") {
    params = loaderUtils.parseQuery(this.resourceQuery);

    if (params.dce === '1') {

      var usedExports = Object
        .keys(params)
        .filter((flagName) => (
          params[flagName] === true
        ));

      buffer = wasmDCE(buffer, usedExports);
    }
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

