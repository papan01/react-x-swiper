const devConfig = require('./webpack.development.config');
const prodConfig = require('./webpack.production.config');

module.exports = (env, argv) => {
  return argv.mode === 'development' ? devConfig(argv) : prodConfig(argv);
};
