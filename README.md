# WASM Binary Module loader for Webpack

## Install

Install package:
`npm install --save wasm-loader`

# Usage

Edit webpack.config.js:
```
  loaders: [
    {
      test: /\.wasm$/,
      loaders: ['wasm-loader']
    }
  ]
```

Include wasm from your code:

```
import Counter from 'wasm/counter';

const counter = new Counter();
console.log(counter.exports.count();) // 0
console.log(counter.exports.count();) // 1
console.log(counter.exports.count();) // 2
```

Default export from wasm module is a constructor which returns a [WebAssembly.Instance](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Instance). `deps` can be passed in to
override defaults.

