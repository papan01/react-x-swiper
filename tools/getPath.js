const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const resolvePath = (...args) => path.resolve(ROOT_DIR, ...args);
const SRC_DIR = resolvePath('src');
const DIST_DIR = resolvePath('dist');
const PUBLISH_DIR = resolvePath('publish');

module.exports = {
  ROOT_DIR,
  resolvePath,
  SRC_DIR,
  DIST_DIR,
  PUBLISH_DIR,
};
