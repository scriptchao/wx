/**
 * Created by scriptchao on 2017/11/2.
 */
import {observable, action} from 'mobx'
import xhr from '../xhr'
import config from '../../../config'

class AuthStore {

    constructor() {
        this.authUserUrl = '/auth/user';
        this.authCallbackUrl = '/auth/callback';
        this.authSignatureUrl = '/auth/signature';
    }


    @action postAuthSignature(shareData) {

        return xhr({
            method: 'post',
            url: this.authSignatureUrl,
            body: {url: location.href.split('#')[0]}
        }).then(response => {
            if (response.result) {
                wx.config({
                    debug: false,
                    appId: response.data.appId,
                    timestamp: response.data.timestamp,
                    nonceStr: response.data.nonceStr,
                    signature: response.data.signature,
                    jsApiList: [
                        'checkJsApi', // 检查api
                        'onMenuShareTimeline',//分享朋友圈
                        'onMenuShareAppMessage', // 分享给朋友
                        'onMenuShareQQ',//分享QQ
                        'onMenuShareWeibo', //分享到微博
                        'onMenuShareQZone',//分享到qq空间
                        'chooseImage', // 选择图片
                        'uploadImage', //上传图片
                        'downloadImage', //下载图片
                        'getNetworkType', //获取网络状态接口
                        'getLocation', // 获取地理位置接口
                        'scanQRCode', // 微信扫一扫
                        'openAddress', // 共享收货地址接口
                        'closeWindow', // 关闭窗口
                    ]
                });
                wx.ready(function () {
                    if (!shareData.link) {
                        shareData.link = response.data.url
                    }
                    wx.onMenuShareAppMessage(shareData);
                    wx.onMenuShareTimeline(shareData);
                    wx.onMenuShareQQ(shareData);
                    wx.onMenuShareWeibo(shareData);
                    wx.onMenuShareQZone(shareData);
                });
                wx.error(function (response) {
                    alert(response.errMsg);
                });
                return Promise.resolve(response)
            } else {

            }
        })
    }

    @action postAuthUser(body) {

        return xhr({
            method: 'post',
            url: this.authUserUrl,
            body: body
        }).then(response => {
            if (response.result) {
                return Promise.resolve(response)
            } else {
                localStorage.removeItem(config.token);
                location.reload()
            }
        })
    }

    @action getAuthCallback(body) {

        return xhr({
            method: 'get',
            url: this.authCallbackUrl,
            body: body
        }).then(response => {
            if (response.result) {
                return Promise.resolve(response)
            } else {

            }
        })
    }
}

export default new AuthStore