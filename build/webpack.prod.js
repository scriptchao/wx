/**
 * Created by scriptchao on 2017/10/26.
 */

import path from 'path'
import webpack from 'webpack'
import merge from 'webpack-merge'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import baseConfig from './webpack.base'


const rootPath = path.resolve(__dirname, '..');
const entryPath = path.join(rootPath, 'app');
const outputPath = path.join(rootPath, 'dist');

const prodConfig = {
    entry: {
        app: [
            'babel-polyfill',
            path.join(entryPath, 'index.js')
        ],
    },
    output: {
        path: path.join(outputPath, 'static'),
        filename: '[name].[chunkhash:6].js',
        publicPath: '/static/'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'postcss-loader'
                    ]
                })
            },
            {
                test: /\.sass$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader', use: [
                        'css-loader',
                        'postcss-loader',
                        'sass-loader',
                    ]
                })
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin('dist', {
            root: rootPath
        }),
        new CopyWebpackPlugin([
            {
                from: path.join(rootPath, 'static'),
            }
        ]),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
        }),
        new ExtractTextPlugin({
            filename: '[name].[contenthash:6].css',
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: path.join(entryPath, 'index.html'),
        }),
    ]
};

export default merge(baseConfig, prodConfig)
