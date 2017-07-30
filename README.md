[![Build Status](https://travis-ci.org/ballercat/wasm-loader.svg?branch=master)](https://travis-ci.org/ballercat/wasm-loader)
[![Package Quality](http://npm.packagequality.com/shield/wasm-loader.svg)](http://packagequality.com/#?package=wasm-loader)

# WASM Binary Module loader for Webpack

A simple `.wasm` binary file loader for Webpack. Import your wasm modules directly into your bundle as Constructors which return `WebAssembly.Instance`. This avoids the need to use fetch and parse for your wasm files. Imported wasm files
are converted to Uint8Arrays and become part of the full JS bundle!

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

## Include wasm from your code

Grab your pre-built wasm file. For demo purposes we will use the excellent [WasmExplorer](https://mbebenita.github.io/WasmExplorer/).
`factorial.wasm` file exports a function returning a factorial for a given number.

With the loader you can import this file directy
```javascript
import makeFactorial from 'wasm/factorial';
```

The default export from the loader is a function returning native `Promise`.  The promise resolves to a  [WebAssembly.Instance](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Instance).

```javascript
makeFactorial().then(instance => {
  // What is with the weird exports._Z4facti function?
  // This is how the function name is encoded by the C++ to wasm compiler
  const factorial = instance.exports._Z4facti;

  console.log(factorial(1)); // 1
  console.log(factorial(2)); // 2
  console.log(factorial(3)); // 6
});
```

`deps` can be passed in to
override defaults. For example

```javascript
makeFactorial({
  'global': {},
  'env': {
    'memory': new WebAssembly.Memory({initial: 100, limit: 1000}),
    'table': new WebAssembly.Table({initial: 0, element: 'anyfunc'})
  }
}).then(instance => { /* code here */ });
```

*Default deps are:*
```javascript
{
  'global': {},
  'env': {
    'memory': new Memory({initial: 10, limit: 100}),
    'table': new Table({initial: 0, element: 'anyfunc'})
  }
}
```

## A note about default deps(importsObject)

Default `importsObject` is meant to be used for a very basic wasm module. Most likely it will not suffice for something not dead simple compiled with emscripten. This is intentional. Supply your own
imports to match the requirements of your wasm module(s). Some options are compiling your source code into S-syntax(`.wast`) examining that output, checking the imports. Compile the s-syntax file with
`asm2wasm` into the final wasm module.

