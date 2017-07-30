const loader = require('./../index');
const Module = require('module');
const { readFileSync } = require('fs');
const wasm = readFileSync(__dirname + '/../factorial.wasm');

const __NOTAREALMODULE__ = '__NOTAREALMODULE__';
const FACTORIALS = [1, 1, 2, 6, 24, 120];

/**
 * NOTE: Some gnarly node module gymnastics are down here.
 *       eval() type nonsense wouldn't really work here as we
 *       are compiling ouput to be a valid node Module :)
 *
 *       All-in-all it's a nice way to test if the loader is working.
 */
describe('wasm-loader', () => {
  let loaderContext;

  beforeEach(() => {
    loaderContext = {
      resourcePath: './counter.wasm',
      options: { context: __dirname + '/../' }
    };
    // Mess with the node module cache to keep tests pure
    Module._cache[__NOTAREALMODULE__] = null;
  });

  it('should create a promise', (done) => {
    loaderContext.callback = (unused, output) => {
      const module = new Module(__NOTAREALMODULE__, null);
      module._compile(output, __NOTAREALMODULE__);
      const shouldBePromise = module.exports();
      expect(typeof shouldBePromise.then).toBe('function');

      done();
    }

    loader.call(loaderContext, wasm);
  });

  it('should create a promise', (done) => {
    loaderContext.callback = (unused, output) => {
      const module = new Module(__NOTAREALMODULE__);
      module._compile(output, __NOTAREALMODULE__);
      module.exports().then(({ instance: { exports: { _Z4facti: factorial } } }) => {
        for(let i = 0; i < FACTORIALS.length; i++) {
          expect(factorial(i)).toBe(FACTORIALS[i]);
        }
        done();
      });
    }

    loader.call(loaderContext, wasm);
  });
});

