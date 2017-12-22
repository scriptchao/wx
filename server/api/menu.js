/**
 * Created by scriptchao on 2017/12/21.
 */

import express from 'express'
import menu from '../wx/menu.json'
import {getToken} from '../wx/auth'
import config from '../wx/config'
import {requestPost} from '../request'

const router = express.Router();

router.get('/create', (req, res) => {
    getToken().then(token => {
        let url = `${config.apiUrl.createMenuUrl}?access_token=${token}`;
        let data = JSON.stringify(menu);
        requestPost(url, data).then(data => {
            res.send(data)
        })
    })
});

export default router
