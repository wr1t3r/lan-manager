import path from 'path';
import webpack from 'webpack';
const Dotenv = require('dotenv-webpack');

export default {
    mode: "development",
    entry: [
        'webpack-hot-middleware/client',
        path.join(__dirname, '/client/js/index.js')
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new Dotenv(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
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
            },
            {
                test: /\.css$/,
                use: [{
                    loader: "css-loader",
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
