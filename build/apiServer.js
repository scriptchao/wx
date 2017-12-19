/**
 * Created by scriptchao on 2017/12/19.
 */
import express from 'express'
import bodyParser from 'body-parser'
import {main} from '../server'
import config from '../config'

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.all('*', function (req, res, next) {

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    }
    else {
        next();
    }
});

app.use('/', main);

app.listen(config.apiPort, (err) => {
    if (err) {
        console.error('err:', err);
    } else {
        console.info(`===> api server is running at ${config.apiHost}:${config.apiPort}`)
    }
});