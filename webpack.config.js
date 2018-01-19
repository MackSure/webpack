var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './src/app.js',
    output: {
        path: __dirname + '/dist',
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            { test: /\.scss$/,   use: ExtractTextPlugin.extract({

                fallback: 'style-loader',

                use: ['css-loader', 'sass-loader'],

                publicPath: '/dist'

            }) }
        ]
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