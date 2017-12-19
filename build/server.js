/**
 * Created by scriptchao on 2017/12/19.
 */

import path from 'path'
import express from 'express'
import httpProxy from 'http-proxy'
import config from '../config'

const app = express();
const apiUrl = `http://${config.apiHost}:${config.apiPort}`;
const proxy = httpProxy.createProxyServer({
    target: apiUrl
});

app.use('/wx', (req, res) => {
    proxy.web(req, res, {target: apiUrl})
});


app.listen(config.port, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`===>app is running at ${config.host}:${config.port}`);
    }
});