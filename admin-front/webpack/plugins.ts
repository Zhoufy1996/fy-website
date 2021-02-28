/** @format */

import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin';

const plugins: webpack.Configuration['plugins'] = [
    new HtmlWebpackPlugin({
        template: path.join(__dirname, '../public/index.html'),
        title: 'demo',
        favicon: path.join(__dirname, '../public/favicon.ico'),
        filename: 'index.html',
        minify: true,
    }),
    new MiniCssExtractPlugin(),
    new AntdDayjsWebpackPlugin(),
];

export default plugins;
