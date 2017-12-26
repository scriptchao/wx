/**
 * Created by scriptchao on 2017/12/22.
 */

function WeChat(token) {
    this.appId = 'wxc568eb37e4f5302a';
    this.domain = 'http://scriptchao.viphk.ngrok.org';
    this.scope = 'snsapi_userinfo';
    this.token = token


}

WeChat.prototype = {
    isPC: function () {
        let u = window.navigator.userAgent;
        if (!u.match(/(iPhone|iPod|Android|ios|iPad)/i)) {
            this.scope = 'snsapi_login';
            return true
        } else {
            return false
        }
    },
    getToken: function () {
        return this.token
    },
    redirect: function (callback) {
        let url = encodeURIComponent(`${this.domain}${callback}`);

        location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appId}&redirect_uri=${url}&response_type=code&scope=${this.scope}&state=state#wechat_redirect`

    },
    splitLocation: function (location) {
        let data = {};

        location.search.slice(1).split('&').map((value) => data[value.split('=')[0]] = value.split('=')[1]);

        return data
    },
    sign: function (shareData) {

        $.ajax({
            url: "/wx/auth/signature",
            type: 'post',
            data: {url: location.href.split('#')[0]},
            success: function (res) {

                wx.config({
                    debug: false,
                    appId: res.appId,
                    timestamp: res.timestamp,
                    nonceStr: res.nonceStr,
                    signature: res.signature,
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
                        'closeWindow', // 关闭窗口
                    ]
                });
                wx.ready(function () {
                    if (!shareData.link) {
                        shareData.link = res.url
                    }
                    wx.onMenuShareAppMessage(shareData);
                    wx.onMenuShareTimeline(shareData);
                    wx.onMenuShareQQ(shareData);
                    wx.onMenuShareWeibo(shareData);
                    wx.onMenuShareQZone(shareData);
                });
                wx.error(function (res) {
                    alert(res.errMsg);
                });
            }
        });
    },
    setClose: function () {

        history.pushState({page: 'state1'}, 'state', '#state1');
        history.pushState({page: 'state2'}, 'state', '#state2');

        window.onpopstate = function (event) {
            if (event.state.page === 'state1') {
                wx.closeWindow()
            }
        }
    },

    getUserInfo: function () {

        let openid = localStorage.getItem(this.token);

        return $.ajax({
            url: '/wx/auth/user',
            type: 'post',
            data: {
                openid: openid
            }
        })
    },

    callback: function (location, redirect_url) {
        let urlData = this.splitLocation(location);

        $.ajax({
            url: `/wx/auth/callback?code=${urlData.code}`,
            type: 'get',
        }).then((response) => {

            localStorage.setItem(this.token, response.data.openid);
            location.href = redirect_url
        })
    }
};