// This file will not run on it's own

const {
  Module,
  Instance,
  Memory,
  Table
} = WebAssembly;

let wa;
const make = source => {
  // buffer should already be set
  return wa = new Module(buffer);
};

const WebAssemblyModule = function(deps = {
  'global': {},
  'env': {
    'memory': new Memory({initial: 10, limit: 100}),
    'table': new Table({initial: 0, element: 'anyfunc'})
  }
}) {
  return new Instance(wa || make(), deps);
}

export default WebAssemblyModule;
