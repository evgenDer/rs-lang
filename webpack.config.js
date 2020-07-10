// eslint-disable-next-line no-unused-vars
// для добавления HTML файлов htmlWebpackPluginCreator(template)
// где template название файла с расширением
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

const optimization = () => {
  const config = {};
  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetWebpackPlugin(),
      new TerserWebpackPlugin(),
    ];
  }
  return config;
};

const cssLoaders = (extra) => {
  const loaders = [{
    loader: MiniCssExtractPlugin.loader,
    options: {
      hmr: isDev,
      reloadAll: true,
    },
  },
    'css-loader',
  ];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};

const babelOptions = (preset) => {
  const opts = {
    presets: [
      '@babel/preset-env',
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
    ],
  };

  if (preset) {
    opts.presets.push(preset);
  }

  return opts;
};

const jsLoaders = () => {
  const loaders = [{
    loader: 'babel-loader',
    options: babelOptions(),
  }];

  return loaders;
};

const htmlWebpackPluginCreator = (template, ...args) => new HtmlWebpackPlugin({
  chunks: [...args],
  template: `./pages/${template}`,
  minify: {
    collapseWhitespace: isProd,
  },
  inject: 'body',
  filename: template,
});

const plugins = () => {
  const base = [
    new HtmlWebpackPlugin({
      chunks: ['index'],
      template: './index.html',
      minify: {
        collapseWhitespace: isProd,
      },
      inject: 'body',
      filename: 'index.html',
    }),
    htmlWebpackPluginCreator('main.html', 'index', 'main_page'),
    htmlWebpackPluginCreator('learningWords.html', 'index'),
    htmlWebpackPluginCreator('games.html', 'index'),
    htmlWebpackPluginCreator('vocabulary.html', 'index'),
    htmlWebpackPluginCreator('configuration.html', 'index', 'settings-page'),
    htmlWebpackPluginCreator('statistics.html', 'index', 'statistics_page'),
    htmlWebpackPluginCreator('games.html', 'index'),
    htmlWebpackPluginCreator('game-audiochallenge.html', 'game_audiochallenge'),
    htmlWebpackPluginCreator('determinationLevel.html', 'index', 'determinationLevel'),

    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './img',
          to: 'assets/img',
        },
        {
          from: '../favicon',
          to: 'favicon',
        },
      ],
    }),
  ];

  return base;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  watchOptions: {
    poll: true,
    ignored: /node_modules/,
  },
  entry: {
    index: ['@babel/polyfill', './js/index.js', './sass/style.scss'],
    main_page: ['@babel/polyfill', './js/main-page/index.js', './sass/style.scss'],
    game_audiochallenge: ['@babel/polyfill', './js/audiochallenge/index.js', './sass/style.scss'],
    determinationLevel: ['@babel/polyfill', './js/determinationLevel/index.js', './sass/style.scss'],
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.json', '.png'],
  },
  optimization: optimization(),
  devServer: {
    port: 8080,
    hot: isDev,
    contentBase: path.join(__dirname, 'dist'),
  },
  devtool: isDev ? 'source-map' : '',
  plugins: plugins(),
  module: {
    rules: [{
      test: /\.css$/, //  на всякий случай
      use: cssLoaders(),
    },
    {
      test: /\.s[ac]ss$/,
      use: cssLoaders('sass-loader'),
    },
    {
      test: /\.(png|jpg|svg|gif)$/,
      use: ['file-loader'],
    },
    {
      test: /\.(ttf|woff|woff2|eot)$/, // для шрифтов
      use: ['file-loader'],
    },
    {
      test: /\.csv$/,
      use: ['csv-loader'],
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: jsLoaders(),
    },
    {
      test: /.(mp3)$/,
      use: [{
        loader: 'file-loader',
        options: {
          outputPath: 'audio',
          name: filename('mp3'),
        },
      }],
    },

    ],
  },
};
