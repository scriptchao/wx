/**
 * Created by scriptchao on 2017/12/21.
 */

import crypto from 'crypto'

export function responseClient(res, httpCode = 500, result = 0, message = '服务端异常', data = {}) {
    let responseData = {};
    responseData.data = data;
    responseData.message = message;
    responseData.result = result;
    res.status(httpCode).json(responseData)
}

// 签名算法
export function sign(jsapi_ticket, url) {
    let ret = {
        jsapi_ticket: jsapi_ticket,
        nonceStr: createNonceStr(),
        timestamp: createTimestamp(),
        url: url
    };
    let str = raw(ret);

    ret.signature = sha1(str);

    return ret;
}


export function sha1(str) {
    return crypto.createHash("sha1").update(str).digest("hex");
}

// 随机字符串
function createNonceStr() {
    return Math.random().toString(36).substr(2, 15);
}

// 时间戳
function createTimestamp() {
    return parseInt(new Date().getTime() / 1000) + '';
}

// 排序拼接
function raw(args) {
    let keys = Object.keys(args);
    keys = keys.sort();
    let newArgs = {};
    keys.forEach(function (key) {
        newArgs[key.toLowerCase()] = args[key];
    });
    let string = '';
    for (let k in newArgs) {
        string += '&' + k + '=' + newArgs[k];
    }
    string = string.substr(1);
    return string;
}



