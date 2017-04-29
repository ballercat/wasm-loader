const loader = require('./../index');
const { readFileSync } = require('fs');
const stripBOM = require('./../strip-bom');
const out = stripBOM(readFileSync(__dirname + '/out.js', 'utf-8'));

describe('wasm-loader', () => {
  let loaderContext;

  beforeEach(() => {
    loaderContext = {
      resourcePath: './counter.wasm',
      options: { context: __dirname + '/../' }
    };
  });

  it('should combine .wasm files to javascript', (done) => {
    loaderContext.callback = (unused, output) => {
      expect(output).toBe(out);
      done();
    }

    loader.call(loaderContext, readFileSync(loaderContext.resourcePath));
  });

  // TODO: Once the node version 8 with MVP(01) support is ready we
  // can actually test the output module. Not really worth the hassle
  // compiling down to 0c of wasm, but can be done
});

