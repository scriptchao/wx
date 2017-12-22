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
                        'checkJsApi',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'closeWindow'
                    ]
                });
                wx.ready(function () {
                    if (!shareData.link) {
                        shareData.link = res.url
                    }
                    wx.onMenuShareAppMessage(shareData);
                    wx.onMenuShareTimeline(shareData);
                    wx.onMenuShareQQ(shareData);
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