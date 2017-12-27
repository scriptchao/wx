/**
 * Created by scriptchao on 2017/12/21.
 */
import fs from 'fs'
import path from 'path'
import accessToken from './access_token.json'
import jsApiTicket from './jsapi_ticket.json'
import config from '../../config'
import {requestGet, requestPost} from '../request'

export function getTicket() {

    return new Promise((resolve, reject) => {

        let currentTime = +new Date();

        if (jsApiTicket.jsapi_ticket === '' || jsApiTicket.expires_time < currentTime) {
            let url = `${config.apiUrl.ticketUrl}?access_token=${accessToken.access_token}&type=jsapi`;
            requestGet(url).then(data => {
                let result = JSON.parse(data);

                if (result.ticket) {
                    jsApiTicket.jsapi_ticket = result.ticket;
                    jsApiTicket.expires_time = +new Date() + (parseInt(result.expires_in) - 200) * 1000;

                    fs.writeFile(path.join(__dirname, 'jsapi_ticket.json'), JSON.stringify(jsApiTicket), (err) => { // 决定路径
                        if (err) {
                            console.log(err)
                        }
                    });

                    resolve(jsApiTicket.jsapi_ticket)
                }
            })
        } else {
            resolve(jsApiTicket.jsapi_ticket)
        }
    })
}


export function getToken() {

    return new Promise((resolve, reject) => {

        let currentTime = +new Date();

        if (accessToken.access_token === '' || accessToken.expires_time < currentTime) {
            let url = config.apiUrl.accessTokenUrl;
            requestGet(url).then(data => {
                let result = JSON.parse(data);

                if (result.access_token) {
                    accessToken.access_token = result.access_token;
                    accessToken.expires_time = +new Date() + (parseInt(result.expires_in) - 200) * 1000;

                    fs.writeFile(path.join(__dirname, 'access_token.json'), JSON.stringify(accessToken), (err) => { // 决定路径
                        if (err) {
                            console.log(err)
                        }
                    });

                    resolve(accessToken.access_token)
                }
            })
        } else {
            resolve(accessToken.access_token)
        }
    })
}
