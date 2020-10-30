const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const Visualizer = require('webpack-visualizer-plugin');
const BaseConfig = require('./webpack.base.config');
const { resolvePath, SRC_DIR } = require('./tools/getPath');

module.exports = argv => {
  const { plugins, ...rest } = BaseConfig(argv);
  plugins.push(
    new HtmlWebpackPlugin({
      title: 'react-x-swiper',
      filename: 'index.html',
      chunks: ['index', 'vendor', 'commons', 'runtime'],
      template: resolvePath(SRC_DIR, 'templates/index.html'),
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      },
      minify: {
        removeComments: true,
        collapseWhitespace: false,
      },
    }),
    new BundleAnalyzerPlugin(),
    new Visualizer(),
  );
  return {
    mode: 'development',
    entry: {
      index: resolvePath(SRC_DIR, 'entry/index.jsx'),
    },
    plugins,
    optimization: {
      splitChunks: {
        cacheGroups: {
          // Split vendor code to its own chunk(s)
          vendor: {
            test: /node_modules/,
            chunks: 'initial',
            name: 'vendor',
            priority: 10,
            enforce: true,
          },
          // Split code common to all chunks to its own chunk
          commons: {
            name: 'commons', // The name of the chunk containing all common code
            chunks: 'initial', // TODO: Document
            minChunks: 2, // This is the number of modules
          },
        },
      },
      // The runtime should be in its own chunk
      runtimeChunk: {
        name: 'runtime',
      },
    },
    ...rest,
  };
};
