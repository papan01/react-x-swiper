const BaseConfig = require('./webpack.base.config');
const { resolvePath, SRC_DIR, PUBLISH_DIR } = require('./tools/getPath');

module.exports = argv => {
  const { plugins, ...rest } = BaseConfig(argv);
  return {
    mode: 'production',
    output: {
      filename: '[name].js',
      library: '[name]',
      libraryTarget: 'umd',
      chunkFilename: '[name].chunk.js',
      path: PUBLISH_DIR,
    },
    entry: {
      Swiper: resolvePath(SRC_DIR, 'components/Swiper.jsx'),
    },
    plugins,
    ...rest,
  };
};
