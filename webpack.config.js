const os = require('os');
const path = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const src = path.resolve(__dirname, 'src');
const cache = path.resolve(os.tmpdir(), 'steady', 'cache');

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
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
              hmr: mode === 'development',
            },
          },
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
    new StyleLintPlugin({
      glob: `${src}/**/*.scss`,
      emitErrors: false,
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(src, 'index.html'),
      minify: false,
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

    new SWPrecacheWebpackPlugin({
      cacheId: 'steady',
      filename: 'sw.js',
      minify: mode === 'production',
    }),
  ]
});
