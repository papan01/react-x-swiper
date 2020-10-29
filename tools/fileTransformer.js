const path = require('path');

// https://jestjs.io/docs/en/webpack
module.exports = {
  process(src, filename) {
    return `module.exports = ${JSON.stringify(path.basename(filename))};`;
  },
};
