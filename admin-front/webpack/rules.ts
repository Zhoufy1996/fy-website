/** @format */

import webpack from 'webpack';
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const rules: webpack.RuleSetRule[] = [
    {
        test: /\.css$/,
        use: [
            {
                loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
        ],
    },
    {
        test: /\.less$/,
        use: [
            {
                loader: MiniCssExtractPlugin.loader, // creates style nodes from JS strings
            },
            {
                loader: 'css-loader', // translates CSS into CommonJS
            },
            {
                loader: 'less-loader', // compiles Less to CSS
            },
        ],
    },
    {
        test: /\.(j|t)s(x?)$/,
        use: [
            {
                loader: 'eslint-loader',
                options: {
                    // fix: true,
                    emitError: true,
                    emitWarning: true,
                },
            },
        ],
        enforce: 'pre',
        exclude: [path.join(process.cwd(), 'node_modules')],
    },
    {
        test: /\.ts(x?)$/,
        use: [
            {
                loader: 'babel-loader',
            },
        ],
        exclude: [path.join(process.cwd(), 'node_modules')],
    },
];

export default rules;
