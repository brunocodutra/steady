const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const stats = {
  colors: true,
  timings: true,
  performance: true,
  errors: true,
  warnings: true,
  hash: false,
  modules: false,
  version: false,
};

module.exports = env => ({
  bail: true,

  entry: {
    'app': [
      'index.jsx'
    ]
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: env === 'production'
      ? '[name].[chunkhash].js'
      : '[name].js'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },

  stats,

  devServer: {
    stats
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),

    env === 'production'
      ? new webpack.HashedModuleIdsPlugin()
      : new webpack.NamedModulesPlugin()
    ,

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      inject: 'body'
    })
  ]
});
