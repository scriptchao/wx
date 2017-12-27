/**
 * Created by scriptchao on 2017/12/21.
 */

import express from 'express'
import {txtMsg, graphicMsg} from '../wx/msg'
import config from '../../config'
import {sha1} from '../util'

const router = express.Router();

router.post('/', (req, res) => { // 接受消息
    const {xml} = req.body;
    let {tousername: toUser, fromusername: fromUser, msgtype: msgType, content, event} = xml;

    let reportMsg = ''; //回复消息变量
    console.log(xml);

    if (msgType === 'event') {
        switch (event) {
            case 'subscribe':
                let contentMsg = '美滋滋,欢迎老哥回来一起哈啤!';
                reportMsg = txtMsg(fromUser, toUser, contentMsg);
                break;
            case 'unsubscribe':
                reportMsg = '';
                break;
            case 'CLICK':
                let contentArr = [
                    {
                        title: '老哥你好!',
                        description: '不好意思,没有描述!',
                        picUrl: 'http://scriptchao.viphk.ngrok.org/static/img/a.jpg',
                        url: 'https://www.baidu.com'
                    },
                    {
                        title: '稳不稳!',
                        description: '不好意思,没有描述!',
                        picUrl: 'http://scriptchao.viphk.ngrok.org/static/img/b.jpg',
                        url: 'https://www.baidu.com'
                    }
                ];

                reportMsg = graphicMsg(fromUser, toUser, contentArr)
        }

    } else if (msgType === 'text') {
        reportMsg = txtMsg(fromUser, toUser, `老哥: ${content}`)

    }

    res.send(reportMsg)
});

router.get('/', (req, res) => { // 微信服务器验证本台服务器的有效性

    let {signature, timestamp, nonce, echostr} = req.query;

    let array = [config.token, timestamp, nonce];
    array.sort();

    let str = array.toString().replace(/,/g, "");

    let code = sha1(str);

    if (code === signature) {
        res.send(echostr)
    } else {
        res.send("error");
    }
});

export default router
