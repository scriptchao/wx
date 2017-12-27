import config from '../../config'

function WeChat() {
    this.appId = config.appId;
    this.domain = config.domain;
    this.scope = config.scope;
    this.redirectUrl = config.apiUrl.redirectUrl;
}

WeChat.prototype = {

    openAddress: function () {

        return new Promise((resolve, reject) => {
            wx.openAddress({
                success: function (res) {
                    // var userName = res.userName; // 收货人姓名
                    // var postalCode = res.postalCode; // 邮编
                    // var provinceName = res.provinceName; // 国标收货地址第一级地址（省）
                    // var cityName = res.cityName; // 国标收货地址第二级地址（市）
                    // var countryName = res.countryName; // 国标收货地址第三级地址（国家）
                    // var detailInfo = res.detailInfo; // 详细收货地址信息
                    // var nationalCode = res.nationalCode; // 收货地址国家码
                    // var telNumber = res.telNumber; // 收货人手机号码
                    resolve(res)
                }
            });
        })
    },

    scanQRCode: function () {
        return new Promise((resolve, reject) => {
            wx.scanQRCode({
                needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: function (res) {
                    resolve(res); // 当needResult 为 1 时，扫码返回的结果
                }
            });
        })
    },
    getLocation: function () {
        return new Promise((resolve, reject) => {
            wx.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    resolve(res);
                }
            });
        })


    },
    getNetworkType: function () {
        return new Promise((resolve, reject) => {

            wx.getNetworkType({
                success: function (res) {
                    resolve(res.networkType);
                }
            });
        })
    },
    redirect: function (state) {
        let url = encodeURIComponent(`${this.domain}/auth`);

        location.href = `${this.redirectUrl}?appid=${this.appId}&redirect_uri=${url}&response_type=code&scope=${this.scope}&state=${state}#wechat_redirect`
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
};

export default new WeChat