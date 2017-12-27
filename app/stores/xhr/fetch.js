/**
 * Created by scriptchao on 2017/11/2.
 */
import {origin} from './config'

const xhr = (req = {}) => {

    let {method, url, body = {}} = req;

    let options = {};

    let search = Object.entries(body).map((value, index) => `${value[0]}=${value[1]}`).join('&');

    if (method === 'get' || method === 'GET') {
        if (search) {
            url = `${url}?${search}`
        }
    }

    if (method === 'post' || method === 'POST') {
        options.body = search
    }

    options.headers = {
        'Content-Type': "application/x-www-form-urlencoded", // body 为a&b
        // 'Content-Type': "application/json", //body 为JSON.Stringify({}) //文件上传和formData不需要content-type
    };
    options.method = method;

    return fetch(origin + url, options)
        .then(res => {
            if (res.ok) { //200-299 ok的条件
                return res.json()

            } else { //这步是没有必要的 自己控制status为200
                return Promise.reject({
                    message: res.status,
                    status: res.status
                })
            }
        }).catch(e => {
            console.log('error', e, e.status);
            if (!e.status) {
                e.message = '网络连接失败!'
            }
        });
};

export default xhr