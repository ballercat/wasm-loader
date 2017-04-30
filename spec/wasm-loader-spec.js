const loader = require('./../index');
const { readFileSync } = require('fs');
const out = readFileSync(__dirname + '/out.js', 'utf-8');
const wasm = readFileSync(__dirname + '/../counter.wasm');

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

    loader.call(loaderContext, wasm);
  });
});

