const os = require('os');
const path = require('path');
const webpack = require('webpack');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebappWebpackPlugin = require('webapp-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const src = path.resolve(__dirname, 'src');

const cacheDirectory = path.resolve(os.tmpdir(), 'steady', 'cache');

const cacheLoader = {
  loader: 'cache-loader',
  options: {
    cacheDirectory,
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
  children: false,
  hash: false,
  modules: false,
  version: false,
};

module.exports = mode => ((process.env.NODE_ENV = mode), {
  mode,

  context: __dirname,

  entry: {
    index: ['index.tsx', 'index.scss'],
  },

  output: {
    publicPath: '/steady/',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    modules: [src, 'node_modules'],
  },

  module: {
    rules: [
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

  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'vendors',
    },
  },

  plugins: [
    mode === 'production'
      ? new webpack.HashedModuleIdsPlugin()
      : new webpack.NamedModulesPlugin()
    ,

    new StyleLintPlugin({
      glob: `${src}/**/*.scss`,
      emitErrors: false,
    }),

    new ForkTsCheckerWebpackPlugin({
      async: false,
      checkSyntacticErrors: true,
    }),

    new HtmlWebpackPlugin({
      inject: 'body',
      template: path.resolve(src, 'index.html'),
    }),

    new ExtractTextPlugin({
      filename: '[name].css',
      disable: mode !== 'production',
    }),

    new WebappWebpackPlugin({
      logo: 'icon/brand.svg',
      cache: cacheDirectory,
      favicons: {
        start_url: '/steady/',
        theme_color: '#343a40',
        background: '#343a40',
        icons: {
          coast: false,
          firefox: false,
          windows: false,
          yandex: false,
        },
      },
    }),

    new SWPrecacheWebpackPlugin({
      cacheId: 'steady',
      filename: 'sw.js',
      minify: mode === 'production',
    }),
  ]
});
