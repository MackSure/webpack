var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var path = require('path');

var isProd = (process.env.NODE_ENV === 'production');
var cssDev = ['style-loader', 'css-loader', 'sass-loader'];
var cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'sass-loader'],
    publicPath: '/dist'
});

var cssConfig = isProd ? cssProd : cssDev;

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
                    // 'file-loader?name=[name].[ext]&outputPath=images/&publicPath=images/', 
                    'image-webpack-loader'
            ]
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

        disable: isProd,

        allChunks: true

    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
    ]
}