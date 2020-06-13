const webpack = require('webpack');
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, options) => {
    const isProduction = options.mode === 'production';

    return {
        mode: isProduction ? 'production' : 'development',
        devtool: isProduction ? 'none' : 'source-map',
        watch: !isProduction,
        entry: ['@babel/polyfill', './src/index.js', './src/sass/style.scss'],
        output: {
            path: path.join(__dirname, '/dist'),
            filename: 'script.js'
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
                {
                    test: /\.scss$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
                },
                {
                    test: /\.(png|svg|jpe?g|gif|woff|woff2|ttf)$/,
                    use: [
                        {
                            loader: 'file-loader'
                        }
                    ]
                },
                {
                    test: /\.html$/,
                    loader: 'html-loader'
                },

            ]
        },
        devServer: {
            contentBase: './dist'
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: './src/index.html',
                favicon: "./favicon/favicon.ico"
            }),
            new HtmlWebpackPlugin({
                hash: true,
                template: './src/pages/dictionary.html',
                inject: 'body',
                filename: 'dictionary.html'
            }),
            new HtmlWebpackPlugin({
                hash: true,
                template: './src/pages/games.html',
                inject: 'body',
                filename: 'games.html'
            }),
            new MiniCssExtractPlugin({
                filename: 'style.css'
            })
        ]
    };
};
