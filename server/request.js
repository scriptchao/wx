/**
 * Created by scriptchao on 2017/12/21.
 */

import https from 'https'
import urltil from 'url'

export function requestPost(url, data) {
    return new Promise((resolve, reject) => {
        let urlData = urltil.parse(url);
        let options = {
            hostname: urlData.hostname, // hostname 不包括端口 host 包括端口
            path: urlData.path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(data, 'utf-8')  // !!!content-length 读的是字节数 所以要用Buffer.byteLength() string or buffer
            }
        };
        let req = https.request(options, (res) => {
            let buffer = [], result = '';
            res.on('data', (data) => {
                buffer.push(data);
            });
            res.on('end', () => {
                result = Buffer.concat(buffer).toString();
                resolve(result);
            })
        }).on('error', (err) => {
            reject(err);
        });

        req.write(data); // string or buffer
        req.end();
    });
}

export function requestGet(url) {

    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let buffer = [], result = '';
            res.on('data', (data) => {
                buffer.push(data)
            });

            res.on('end', () => {
                result = Buffer.concat(buffer).toString(); //length 所有buffer长度
                resolve(result)
            })
        }).on('error', (err) => {
            reject(err)
        })
    })
}
