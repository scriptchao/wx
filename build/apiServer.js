/**
 * Created by scriptchao on 2017/12/19.
 */
import express from 'express'
import bodyParser from 'body-parser'
import xmlParser from 'express-xml-bodyparser'
import mongoose from 'mongoose'
import blueBird from 'bluebird'
import {wx} from '../server'
import config from '../config'

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(xmlParser({explicitArray: false}));

app.all('*', function (req, res, next) {

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    }
    else {
        next();
    }
});

app.use('/', wx);

mongoose.Promise = blueBird;

mongoose.connect(`mongodb://${config.dbHost}:${config.dbPort}/wx`, {useMongoClient: true}, function (err) {
    if (err) {
        console.log(err, "数据库连接失败");
        return;
    }
    console.log('数据库连接成功');

    app.listen(config.apiPort, (err) => {
        if (err) {
            console.error('err:', err);
        } else {
            console.info(`===> api server is running at ${config.apiHost}:${config.apiPort}`)
        }
    });
});



