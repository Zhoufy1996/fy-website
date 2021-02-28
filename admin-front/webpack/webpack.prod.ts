/** @format */

import webpack from 'webpack';
import merge from 'webpack-merge';
import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import commonConfig from './webpack.common';

const devConfig: webpack.Configuration = merge(commonConfig, {
    mode: 'production',
    entry: {
        app: [path.join(__dirname, '../src/main.dev.tsx')],
    },
    output: {
        path: path.join(process.cwd(), 'dist'),
        filename: '[name].[fullhash].js',
        publicPath: '/',
    },
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin({}),
        new UglifyJSPlugin({
            sourceMap: true,
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerHost: '127.0.0.1',
            analyzerPort: '8888',
            reportFilename: 'report.html',
            defaultSizes: 'parsed',
            openAnalyzer: true,
            generateStatsFile: false,
            statsFilename: 'stats.json',
            statsOptions: null,
            excludeAssets: null,
        }),
    ],
});

export default devConfig;
