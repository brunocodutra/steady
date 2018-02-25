require('raf/polyfill');

expect.extend(require('./closeTo').default);
expect.extend(require('./nan').default);
