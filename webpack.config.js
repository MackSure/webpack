var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        app: './src/app.js',
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
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
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
        // minify: {
        //     collapseWhitespace: true
        // },
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

        filename: "app.css",

        disable: true,

        allChunks: true

    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
    ]
}