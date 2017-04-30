var fs = require('fs');
var bootstrap = fs.readFileSync(__dirname + '/output.js', 'utf8');

module.exports = function(buffer) {
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

