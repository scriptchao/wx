/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react'
import {observable} from 'mobx'
import {inject, observer} from 'mobx-react'
import './test.sass'
import config from '../../config'
import weChat from '../com/weChat'


@inject('AuthStore', 'MapStore') @observer
class Test extends React.Component {
    @observable userInfo = {};
    @observable networkType;
    @observable longitude;
    @observable latitude;

    constructor(args) {
        super(args);
        this.authStore = this.props.AuthStore;
        this.mapStore = this.props.MapStore;

    }

    componentWillMount() {
        if (localStorage.getItem(config.token)) {
            this.getUserInfo()

        } else {
            weChat.redirect('test')
        }
    }

    getUserInfo() {

        let body = {};
        body.openid = localStorage.getItem(config.token);

        this.authStore.postAuthUser(body).then(response => {
            if (response) {
                this.userInfo = response.data;
            }
        })
    }

    componentDidMount() {
        weChat.setClose();
        let shareData = {
            title: '美滋滋!',
            desc: '杀鸡就是要用牛刀!',
            link: '',
            imgUrl: 'http://scriptchao.viphk.ngrok.org/static/img/a.jpg',
        };

        this.authStore.postAuthSignature(shareData).then(response => {
            if (response) {
                console.log(response)
            }
        })
    }

    getAddress() {
        let body = {};
        body.longitude = this.longitude;
        body.latitude = this.latitude;
        this.mapStore.getMap(body)

    }

    render() {
        const {address} = this.mapStore;
        return (
            localStorage.getItem(config.token) ?
                <div className="test">
                    {
                        this.userInfo.nickname ?
                            <ul className="info">
                                <li><label>姓名 : </label><span>{this.userInfo.nickname}</span></li>
                                <li><label>性别 : </label><span>{this.userInfo.sex == 1 ? '男' : '女'}</span></li>
                                <li><label>所在地 : </label><span>{`${this.userInfo.province} ${this.userInfo.city}`}</span></li>
                            </ul> : null
                    }
                    <div className="btn" onClick={() => {
                        weChat.getNetworkType().then(networkType => {
                            this.networkType = networkType
                        })
                    }}>获取网络状态
                    </div>
                    <span>{this.networkType}</span>
                    <div className="btn" onClick={() => {
                        weChat.getLocation().then(data => {
                            this.longitude = data.longitude;
                            this.latitude = data.latitude;
                        })
                    }}>获取经纬度
                    </div>
                    <span>{this.longitude}</span><br/>
                    <span>{this.latitude}</span>
                    <div className="btn" onClick={this.getAddress.bind(this)}>获取具体位置</div>
                    <span>{address}</span>
                    <div id="allmap" style={{width: '600px', height: '600px'}}>{null}</div>
                    <div className="btn" onClick={() => {
                        weChat.scanQRCode()
                    }}>微信扫一扫
                    </div>
                    <div className="btn" onClick={() => {
                        weChat.openAddress().then(data => {
                            console.log(666)
                        })
                    }}>共享收货地址
                    </div>
                    {/*<div onClick="chooseImage()" id="chooseImage" class="btn">拍照或从手机相册中选图7</div>*/}
                    {/*<img src="" id="img1"/>*/}
                    {/*<div onclick="uploadImage()" className="btn">上传图片</div>*/}
                    {/*<span className="hide" id="tip1">上传成功，请点击下载图片</span>*/}
                    {/*<div onClick="downloadImage()" className="btn">下载图片</div>*/}
                    {/*<img src="" id="img2"/>*/}
                </div> : null
        )
    }
}

export default Test
