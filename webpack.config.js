// eslint-disable-next-line no-unused-vars
const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, options) => {
  const isProduction = options.mode === 'production';
  const config = {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'none' : 'source-map',
    watch: !isProduction,
    entry: ['babel-polyfill', './src/js/index.js', './src/sass/style.scss'],
    output:
    {
      path: path.join(__dirname, '/dist'),
      filename: 'script.js',
    },

    module: {
      rules: [
        {
          test: /.(mp3)$/,
          use: [{
            loader: 'file-loader',
            options: {
              outputPath: 'audio',
              name: '[name].[ext]',
            },
          }],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        }, {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader',
          ],
        }, {
          test: /\.(png|svg|jpe?g|gif)$/,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        }, {
          test: /\.html$/,
          loader: 'html-loader',
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './src/pages/authorization.html',
        filename: 'authorization.html',
      }),
      new MiniCssExtractPlugin({
        filename: 'style.css',
      }),
      new HtmlWebpackPlugin({
        hash: true,
        template: './src/pages/main.html',
        inject: 'body',
        filename: 'main.html',
      }),
      new HtmlWebpackPlugin({
        hash: true,
        template: './src/pages/learningWords.html',
        inject: 'body',
        filename: 'learningWords.html',
      }),
      new HtmlWebpackPlugin({
        hash: true,
        template: './src/pages/games.html',
        inject: 'body',
        filename: 'games.html',
      }),
      new HtmlWebpackPlugin({
        hash: true,
        template: './src/pages/dictionary.html',
        inject: 'body',
        filename: 'dictionary.html',
        template: './src/pages/configuration.html',
        inject: 'body',
        filename: 'configuration.html',
      }),
      new CopyPlugin({
        patterns: [
          {
            from: './src/img',
            to: 'assets/img',
          },
          /* {
            from: './src/audio',
            to: 'assets/audio',
          }, */
        ],
      }),
    ],
  };
  return config;
};
