const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');

const bootstrapEntryPoints = require('./webpack.bootstrap.config.js');

const isProd = (process.env.NODE_ENV === 'production');
const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'sass-loader'],
    publicPath: '/dist'
});

const cssConfig = isProd ? cssProd : cssDev;
const bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;

module.exports = {
    entry: {
        app: './src/app.js',
        bootstrap: bootstrapConfig,
        contact: './src/contact.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: cssConfig
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\jpe?g|.png|gif|svg$/i,
                use: [
                    'file-loader?name=images/[name].[ext]',
                    //you can use it like below.
                    // 'file-loader?name=[hash:12].[ext]&outputPath=images/&publicPath=images/', 
                    // 'image-webpack-loader'
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    },
                ]
            },
            { test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000&name=fonts/[name].[ext]' },
            { test: /\.(ttf|eot)$/, loader: 'file-loader?name=fonts/[name].[ext]' },
            { test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, loader: 'imports-loader?jQuery=jquery' }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8080,
        stats: 'errors-only',
        hot: true,
        open: true
    },
    plugins: [new HtmlWebpackPlugin({
        title: 'Custom template',
        excludeChunks: ['contact'],
        hash: true,
        template: './src/index.html'
    }),
    new HtmlWebpackPlugin({
        title: 'Contact Page Demo',
        hash: true,
        chunks: ['contact'],
        filename: 'contact.html',
        template: './src/contact.html'
    }),
    new ExtractTextPlugin({

        filename: "/css/[name].css",

        disable: !isProd,

        allChunks: true

    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new PurifyCSSPlugin({
        paths: glob.sync(path.join(__dirname, 'src/*html'))
    })
    ]
}