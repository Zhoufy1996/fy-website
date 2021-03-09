/** @format */
import { setConfig } from 'react-hot-loader';
import { hot } from 'react-hot-loader/root';
import App from './app/App';

setConfig({
    logLevel: 'debug',
    trackTailUpdates: false,
    reloadHooks: true,
});

const HotApp = hot(App);

export default HotApp;
