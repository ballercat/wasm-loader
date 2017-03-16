var fs = require('fs');
var bootstrap = fs.readFileSync(__dirname + '/output.js', 'utf8');
function toUTF8Array(str) {
    var utf8 = [];
    for (var i=0; i < str.length; i++) {
        var charcode = str.charCodeAt(i);
        if (charcode < 0x80) utf8.push(charcode);
        else if (charcode < 0x800) {
            utf8.push(0xc0 | (charcode >> 6),
                      0x80 | (charcode & 0x3f));
        }
        else if (charcode < 0xd800 || charcode >= 0xe000) {
            utf8.push(0xe0 | (charcode >> 12),
                      0x80 | ((charcode>>6) & 0x3f),
                      0x80 | (charcode & 0x3f));
        }
        // surrogate pair
        else {
            i++;
            // UTF-16 encodes 0x10000-0x10FFFF by
            // subtracting 0x10000 and splitting the
            // 20 bits of 0x0-0xFFFFF into two halves
            charcode = 0x10000 + (((charcode & 0x3ff)<<10)
                      | (str.charCodeAt(i) & 0x3ff));
            utf8.push(0xf0 | (charcode >>18),
                      0x80 | ((charcode>>12) & 0x3f),
                      0x80 | ((charcode>>6) & 0x3f),
                      0x80 | (charcode & 0x3f));
        }
    }
    return utf8;
}

module.exports = function(source) {
  var buffer = Uint8Array.from(toUTF8Array(source)); //Buffer.from(source, 'binary');
  var out = "var buffer = new ArrayBuffer(" + buffer.length + ");";
  out += "var uint8 = new Uint8Array(buffer);";
  out += "uint8.set([";
  console.log(buffer.length, source.length);
  for(var i = 0; i < buffer.length; i++) {
    out += buffer[i] + ","
  }
  out += "]);"
  out += bootstrap;

  this.callback(null, out);
};

