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
      'react-hot-loader/patch',
      'bootstrap',
      'styles.scss',
      'index.tsx'
    ]
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: env === 'production'
      ? '[name].[chunkhash].js'
      : '[name].js'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'tslint-loader',
        exclude: /node_modules/,
        enforce: 'pre',
        options: {
          typeCheck: true
        }
      },

      {
        test: /\.(ts|tsx)$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/
      },

      {
        test: /\.(css$|scss)$/,
        use: [
          {
            loader: 'style-loader',
          },

          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            }
          },

          {
            loader: 'postcss-loader'
          },

          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
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

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      inject: 'body'
    })
  ]
});
