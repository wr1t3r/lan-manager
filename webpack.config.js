import webpack from "webpack";

const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: "production",
    entry: [
        path.join(__dirname, '/client/js/index.js')
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new Dotenv(),
    ],
    node: {
        fs: 'empty',
        child_process: 'empty',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'client'),
                loaders: require.resolve('babel-loader'),
                options: {
                    cacheDirectory: true,
                    plugins: ['react-hot-loader/babel'],
                },
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader",
                    options: {
                        includePaths: ["client/css"]
                    }
                }]
            }
        ]
    },
    resolve: {
        extensions: ['.js']
    }
};
