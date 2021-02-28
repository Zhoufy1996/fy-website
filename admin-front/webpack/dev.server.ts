/** @format */
import express from 'express';
import { webpack } from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';

import devConfig from './webpack.dev';

const port = 4000;
const app = express();

const compiler = webpack(devConfig);

const publicPath = devConfig.output?.publicPath as string;

const instance = webpackDevMiddleware(compiler, {
    publicPath,
});

app.use(instance);

app.use(WebpackHotMiddleware(compiler));

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`render is listening on port ${port}!\n`);
});
