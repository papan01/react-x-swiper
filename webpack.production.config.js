const BaseConfig = require('./webpack.base.config');
const { resolvePath, SRC_DIR } = require('./tools/getPath');

module.exports = argv => {
  const { plugins, ...rest } = BaseConfig(argv);
  return {
    mode: 'production',
    entry: {
      'react-x-swiper': resolvePath(SRC_DIR, 'components/Swiper.jsx')
    },
    plugins,
    ...rest
  };
};
