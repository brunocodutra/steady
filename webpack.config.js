const os = require('os');
const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin');

const src = path.resolve(__dirname, 'src');
const cache = path.resolve(os.tmpdir(), 'steady', 'cache');

module.exports = ({ production } = {}) => ({
  mode: production ? "production" : "development",

  context: __dirname,

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    modules: [src, 'node_modules'],
  },

  entry: {
    index: ['index.tsx', 'index.scss'],
  },

  output: {
    publicPath: '/steady/',
  },

  devServer: {
    publicPath: '/steady/',
    https: true,
  },

  devtool: production ? false : 'eval',

  stats: {
    children: false,
    modules: false,
  },

  experiments: {
    asyncWebAssembly: true,
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: cache,
            },
          },
          'ts-loader'
        ],
      },

      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
      },

      {
        test: /\.svg$/,
        issuer: /\.tsx$/,
        loader: 'svg-react-loader',
      },

      {
        test: /\.svg$/,
        issuer: /\.html$/,
        loader: 'url-loader',
        options: {
          esModule: false,
        },
      },

      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ]
  },

  plugins: [
    new ESLintPlugin({
      context: src,
      failOnError: true,
    }),

    new StyleLintPlugin({
      context: src,
      failOnError: true,
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(src, 'index.html'),
    }),

    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),

    new FaviconsWebpackPlugin({
      logo: './src/icon/brand.svg',
      cache,
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

    new WorkboxPlugin.GenerateSW({
      swDest: 'sw.js',
      clientsClaim: true,
      skipWaiting: true,
    }),
  ]
});
