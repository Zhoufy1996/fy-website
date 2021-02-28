/** @format */
import webpack from 'webpack';
import merge from 'webpack-merge';
import path from 'path';
import commonConfig from './webpack.common';

const devConfig: webpack.Configuration = merge(commonConfig, {
    mode: 'development',
    entry: {
        app: ['react-hot-loader/patch', 'webpack-hot-middleware/client', path.join(__dirname, '../src/main.dev.tsx')],
    },
    devtool: 'source-map',
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom',
        },
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
});

export default devConfig;
