const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { SRC_DIR, DIST_DIR } = require('./tools/getPath');

module.exports = argv => {
  const isDev = argv.mode === 'development';
  const plugins = [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].[chunkhash:8].css',
    }),
  ];

  const output = {
    filename: isDev ? '[name].js' : '[name].[chunkhash:8].js',
    chunkFilename: isDev ? '[name].chunk.js' : '[name].[chunkhash:8].chunk.js',
    path: DIST_DIR,
  };

  return {
    plugins,
    resolve: {
      extensions: ['.jsx', '.js', '.json'],
    },
    output,
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: isDev,
              },
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.(png|jpeg|jpg|gif|webp)$/,
          use: ['file-loader?name=assets/images/[contenthash].[ext]'],
        },
        {
          test: /\.(woff|woff2|svg|eot|ttf|otf)$/,
          use: ['file-loader?name=assets/fonts/[contenthash].[ext]'],
        },
        {
          test: /\.(ts|js)x?$/,
          exclude: /(node_modules|bower_components)/,
          include: [SRC_DIR],
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
              },
            },
            {
              loader: 'eslint-loader',
            },
          ],
        },
      ],
    },
    devtool: isDev ? 'cheap-module-inline-source-map' : 'source-map',
  };
};
