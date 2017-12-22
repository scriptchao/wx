/**
 * Created by scriptchao on 2017/12/21.
 */
import express from 'express'
import OAuth from 'wechat-oauth'
import config from '../wx/config'
import {getToken, getTicket} from '../wx/auth'
import {sign, responseClient} from '../util'

const router = express.Router();
const client = new OAuth(config.appId, config.appSecret);

router.post('/user', (req, res) => {
    let {openid} = req.body;

    client.getUser(openid, (err, user) => {

        responseClient(res, 200, 1, '获取用户信息成功!', user)
    })
});

router.get('/callback', (req, res) => { // 通过code 获取openid 和 accessToken
    let {code} = req.query;

    client.getAccessToken(code, (err, result) => {
        if (err) {
            console.error('getAccessToken error: ', err);
            return
        }
        // const accessToken = result.data.access_token;
        const openid = result.data.openid;
        let data = {};
        data.openid = openid;

        responseClient(res, 200, 1, '获取用户openid成功!', data);

    })
});

router.get('/token', (req, res) => {

    getToken().then(token => {
        res.send(token)
    })
});

router.post('/signature', (req, res) => {
    getToken().then(token => {
        getTicket().then(ticket => {
            let signatureStr = sign(ticket, req.body.url);
            signatureStr.appId = config.appId;
            res.send(signatureStr)
        })
    })
});


export default router
