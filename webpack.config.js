const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin');

const src = path.resolve(__dirname, 'src');

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
    https: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
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
        loader: 'ts-loader',
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
        test: /\.html$/,
        loader: 'html-loader',
      },

      {
        test: /\.svg$/,
        issuer: /\.tsx$/,
        loader: 'svg-react-loader',
      },

      {
        test: /\.svg$/,
        issuer: /\.html$/,
        type: 'asset/inline',
      },
    ]
  },

  plugins: [
    new ESLintPlugin({
      files: 'src/**/*.{ts,tsx}',
    }),

    new StyleLintPlugin({
      files: 'src/**/*.scss',
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
