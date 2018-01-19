var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            { test: /\.scss$/,   use: ExtractTextPlugin.extract({

                fallback: 'style-loader',

                use: ['css-loader', 'sass-loader'],

                publicPath: '/dist'

            }) },
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
        open: true
    },
    plugins: [new HtmlWebpackPlugin({
        title: 'Custom template',
        minify: {
            collapseWhitespace: true
        },
        template: './src/index.html'
    }),
    new ExtractTextPlugin({

        filename: "app.css",

        disable: false,

        allChunks: true

    })
]
}