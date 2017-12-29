/**
 * Created by scriptchao on 2017/12/19.
 */

import path from 'path'
import webpack from 'webpack'
import express from 'express'
import httpProxy from 'http-proxy'
import connectHistoryApiFallback from 'connect-history-api-fallback'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import compression from 'compression'
import config from '../config'
import devConfig from './webpack.dev'
import prodConfig from './webpack.prod'

const app = express();
const apiUrl = `http://${config.apiHost}:${config.apiPort}`;
const proxy = httpProxy.createProxyServer({
    target: apiUrl
});

app.use('/wx', (req, res) => {
    proxy.web(req, res, {target: apiUrl})
});

app.use(compression());

if (process.env.NODE_ENV === 'development') {

    const compiler = webpack(devConfig);

    app.use('/', connectHistoryApiFallback()); // 访问任何地址时指向根目录

    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: '/',// 虚拟目录
    }));

    app.use(webpackHotMiddleware(compiler));
} else {
    webpack(prodConfig, (err, stats) =>
        console.log('the static files have been generated,please open browser for watch')
    );

    app.use('/', connectHistoryApiFallback());

    app.use('/', express.static(path.join(__dirname, '..', 'dist')));
}

app.listen(config.port, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`===>app is running at ${config.host}:${config.port}`);
    }
});