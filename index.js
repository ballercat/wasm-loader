var fs = require('fs');
var loaderUtils = require('loader-utils');
var bootstrap = fs.readFileSync(__dirname + '/output.js', 'utf8');

module.exports = function() {
  var path = loaderUtils.interpolateName(this, '[path][name].[ext]', { context: this.options.context });
  // TODO: Figure out if there is a way to convert webpacks source param to Uint8 correctly
  var buffer = fs.readFileSync(this.options.context + "/" + path, 'binary');
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

