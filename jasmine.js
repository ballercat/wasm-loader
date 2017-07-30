var Jasmine = require('jasmine');
var jasmine = new Jasmine();

const nodeVersionMajor = () => {
  if (process && process.versions && process.versions.node) {
    const full = process.versions.node;
    const major = full.substr(0, full.indexOf('.'));
    return Number.parseInt(major);
  }

  return Number.MAX_SAFE_INTEGER;
}

const major = nodeVersionMajor();
if (major < 8) {
  throw new Error(
  `Native WebAssembly Node API used in specs. Major Node version required >= 8, current ${major}`);
}

jasmine.loadConfig({
	spec_dir: 'spec',
	spec_files: [
		'**/*[sS]pec.js'
	],
	helpers: [
		'helpers/**/*.js'
	]
});

jasmine.execute();
