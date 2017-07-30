# Contributing

All contributions are welcomed from docs to tests, to any missing feature.

## Tests.

Thanks to node 8.0 we can test the loader without ever having to run it through a real App. _We could test that
the webpack integration is working correctly but it's not necessary IMO, this is a simple loader_.

What you will need:

* Node version >= 8

Run:

`nmp test`


## Bug? Write a test.

If you find a bug please write a test case for it. Refer to the main spec file on how to run the loader outside webpack.

## New feature? Write a test.

The loader is simple so there is only one test which is necessary. It tests that the output of the loader is accurate `wasm-loader-spec.js`.
Add all the necessary features you like just make sure the main spec does not break.

Happy Hacking!

