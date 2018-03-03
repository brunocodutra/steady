const {createHash} = require('crypto');
const {execSync} = require('child_process');

const run = code => execSync(`node -e ${JSON.stringify(code)}`).toString();

module.exports = {
  process(src) {
    return run(`require('svg-react-loader/lib')({}, ${JSON.stringify(src)}).subscribe(console.log)`);
  },

  getCacheKey(src) {
    return createHash('md5').update(src).digest('hex');
  },
};
