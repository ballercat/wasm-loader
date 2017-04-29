const loader = require('./../index');
const { readFileSync } = require('fs');
const out = readFileSync(__dirname + '/out.js');

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
			expect(output.indexOf(out) != -1).toBe(true);
      done();
    }

    loader.call(loaderContext);
  });
});

