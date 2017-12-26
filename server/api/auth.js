/**
 * Created by scriptchao on 2017/12/21.
 */
import express from 'express'
import OAuth from 'wechat-oauth'
import config from '../wx/config'
import {getToken, getTicket} from '../wx/auth'
import {sign, responseClient} from '../util'
import User from '../models/user'

const router = express.Router();
const client = new OAuth(config.appId, config.appSecret);

router.post('/user', (req, res) => { //snsapi_base 这一步不能获取到用户信息
    let {openid} = req.body;
    console.log(openid);

    User.findOne({openid}, 'city country province imgUrl nickname sex -_id')
        .then(data => {
            if (data) {
                responseClient(res, 200, 1, '获取用户信息成功!', data)

            } else {
                responseClient(res, 200, 0, '获取用户信息失败!')
            }
        }).catch(err => {
        responseClient(res)
    })
});

router.get('/callback', (req, res) => { // 通过code 获取openid 和 accessToken
    let {code} = req.query;

    client.getAccessToken(code, (err, result) => {
        if (err) {
            console.error('getAccessToken error: ', err);
            return
        }
        const openid = result.data.openid;
        console.log('result',result);

        let options = {};
        options.openid = openid;

        User.findOne({openid})
            .then(data => {

                if (data) {
                    responseClient(res, 200, 1, '获取用户openid成功!', options);
                } else {
                    client.getUser(openid, (err, data) => {
                        let {openid, nickname, sex, language, city, province, country} = data;
                        let user = new User({
                            openid,
                            nickname,
                            sex,
                            language,
                            city,
                            province,
                            country,
                            imgUrl: data.headimgurl
                        });

                        user.save().then(() => {
                            responseClient(res, 200, 1, '获取用户openid成功!', options);
                        })
                    })
                }
            }).catch(err => {
            responseClient(res)
        });
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
