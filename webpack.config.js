const os = require('os');
const path = require('path');
const webpack = require('webpack');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebappWebpackPlugin = require('webapp-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const IgnoreAssetsWebpackPlugin = require('ignore-assets-webpack-plugin');

const src = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'dist');

const cacheLoader = {
  loader: 'cache-loader',
  options: {
    cacheDirectory: path.resolve(os.tmpdir(), 'steady', 'cache'),
  },
};

const tsLoader = {
  loader: 'ts-loader',
  options: {
    happyPackMode: true,
  },
};

const cssLoader = {
  loader: 'css-loader',
  options: {
    importLoaders: 2,
  }
};

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
    app: [
      '@babel/polyfill',
      'react-hot-loader/patch',
      'index.tsx',
      'index.html',
      'index.scss',
    ],
  },

  output: {
    path: dist,
    filename: '[name].js',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    modules: [src, 'node_modules'],
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'htmlhint-loader',
        exclude: /node_modules/,
        enforce: 'pre',
      },

      {
        test: /\.tsx?$/,
        loader: 'tslint-loader',
        exclude: /node_modules/,
        enforce: 'pre',
        options: {
          typeCheck: true,
        },
      },

      {
        test: /\.tsx?$/,
        use: [cacheLoader, 'thread-loader', 'babel-loader', tsLoader],
        exclude: /node_modules/,
      },

      {
        test: /\.svg$/,
        issuer: /\.tsx$/,
        use: [cacheLoader, 'thread-loader', 'babel-loader', 'svg-react-loader'],
      },

      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [cacheLoader, cssLoader, 'postcss-loader', 'sass-loader'],
        })
      },

      {
        test: /\.html$/,
        loader: 'html-loader',
      },

      {
        test: /\.svg$/,
        issuer: /\.html$/,
        loader: 'url-loader',
      },
    ]
  },

  stats,

  devServer: {
    stats,
    overlay: true,
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),

    env === 'production'
      ? new webpack.HashedModuleIdsPlugin()
      : new webpack.NamedModulesPlugin()
    ,

    new StyleLintPlugin({
      glob: `${src}/**/*.scss`,
      emitErrors: false,
    }),

    new ExtractTextPlugin({
      filename: '[name].css',
      disable: env !== 'production',
    }),

    new ForkTsCheckerWebpackPlugin({
      async: false,
      checkSyntacticErrors: true,
    }),

    new HtmlWebpackPlugin({
      inject: 'body',
      template: path.resolve(src, 'index.html'),
      inlineSource: '\.(css|js)',
    }),

    new WebappWebpackPlugin({
      logo: 'icon/brand.svg',
      prefix: 'assets/',
      favicons: {
        start_url: '/steady',
        theme_color: '#343a40',
        background: '#343a40',
        icons: {
          coast: false,
          firefox: false,
          yandex: false,
        },
      },
    }),

    new HtmlWebpackInlineSourcePlugin(),

    new IgnoreAssetsWebpackPlugin({
        ignore: ['app.js', 'app.css'],
    }),
  ]
});
