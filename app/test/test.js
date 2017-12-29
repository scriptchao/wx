/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react'
import {observable} from 'mobx'
import {inject, observer} from 'mobx-react'
import WeUi from 'react-weui'
import './test.sass'
import config from '../../config'
import weChat from '../com/weChat'

const {Button, Dialog, Toptips} = WeUi;


@inject('AuthStore', 'MapStore') @observer
class Test extends React.Component {
    @observable userInfo = {};
    @observable networkType;
    @observable longitude;
    @observable latitude;
    @observable localIds = [];
    @observable serverIds = [];
    @observable downloadIds = [];

    @observable tip1;
    @observable tip2;
    @observable tip3;
    @observable tip4;
    @observable tip5;

    constructor(args) {
        super(args);
        this.authStore = this.props.AuthStore;
        this.mapStore = this.props.MapStore;

    }

    componentWillMount() {
        // if (localStorage.getItem(config.token)) {
        //     this.getUserInfo()
        //
        // } else {
        //     weChat.redirect('test')
        // }
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

        let shareData = {
            title: '美滋滋!',
            desc: '杀鸡就是要用牛刀哦!',
            link: '',
            imgUrl: '/static/img/a.jpg',
        };

        this.authStore.postAuthSignature(shareData).then(response => {
            if (response) {
                console.log(response)
            }
        });

        // weChat.setClose();
    }

    getAddress() {
        let body = {};
        body.longitude = this.longitude;
        body.latitude = this.latitude;
        this.mapStore.getMap(body).then(response => {
            if (response) {
                this.tip3 = true
            }
        })


    }

    render() {
        const {address} = this.mapStore;
        return (

            <div className="test">
                {
                    this.userInfo.nickname ?
                        <div className="info">
                            <div className="pic">
                                <img src={this.userInfo.imgUrl}/>
                            </div>
                            <div>
                                <span>{`姓名 ：${this.userInfo.nickname}`}</span><br/>
                                <span>{`性别 ：${this.userInfo.sex == 1 ? '男' : '女'}`}</span><br/>
                                <span>{`所在地 ：${this.userInfo.province} ${this.userInfo.city}`}</span>
                            </div>
                        </div> : null
                }
                <Button plain className="btn" onClick={() => {
                    weChat.getNetworkType().then(networkType => {
                        this.networkType = networkType;
                        this.tip1 = true;
                        setTimeout(() => {
                            this.tip1 = false

                        }, 2000)
                    })
                }}>获取网络状态111
                </Button>
                <Button plain className="btn" onClick={() => {
                    weChat.getLocation().then(data => {
                        this.longitude = data.longitude;
                        this.latitude = data.latitude;
                        this.tip2 = true;
                        setTimeout(() => {
                            this.tip2 = false

                        }, 2000)
                    })
                }}>获取经纬度
                </Button>
                <Button plain className="btn" onClick={this.getAddress.bind(this)}>获取具体位置</Button>
                <Button plain className="btn" onClick={() => {
                    weChat.scanQRCode()
                }}>微信扫一扫
                </Button>
                <Button plain className="btn" onClick={() => {
                    weChat.openAddress().then(data => {
                    })
                }}>共享收货地址
                </Button>
                <Button plain className="btn" onClick={() => {
                    weChat.chooseImage().then(localIds => {
                        this.localIds = localIds;
                        this.tip4 = true
                    })
                }}>拍照或从手机相册中选图
                </Button>

                <Button plain className="btn" onClick={() => {
                    this.localIds.map(localId => {
                        weChat.uploadImage(localId).then(serverId => {
                            this.serverIds.push(serverId);

                        })
                    })
                }}>上传图片
                </Button>
                {
                    this.serverIds.length ?
                        <Button plain className="btn" onClick={() => {
                            this.serverIds.map(serverId => {
                                weChat.downloadImage(serverId).then(downloadId => {
                                    this.downloadIds.push(downloadId);
                                    this.tip5 = true
                                })
                            })

                        }}>上传成功,请点击下载图片</Button> : null
                }
                <Toptips show={this.tip1}>{this.networkType}</Toptips>
                <Toptips type="info" show={this.tip2}>{`经度 ：${this.longitude} 纬度 ：${this.latitude}`}</Toptips>
                <Dialog type="ios" show={this.tip3} className="dialog" buttons={[
                    {
                        type: 'primary',
                        label: 'Ok',
                        onClick: () => {
                            this.tip3 = false
                        }
                    }
                ]}>
                    <span className="title">{address}</span>
                    <div id="allmap" className="map">{null}</div>
                </Dialog>
                <Dialog type="ios" show={this.tip4} className="dialog" buttons={[
                    {
                        type: 'primary',
                        label: '没毛病',
                        onClick: () => {
                            this.tip4 = false
                        }
                    }
                ]}>{this.localIds.map(src => <img src={src}/>)}</Dialog>
                <Dialog type="ios" show={this.tip5} className="dialog" buttons={[
                    {
                        type: 'primary',
                        label: '一点毛病没有',
                        onClick: () => {
                            this.tip5 = false
                        }
                    }
                ]}>{this.downloadIds.map(src => <img src={src}/>)}</Dialog>
            </div>
        )
    }
}

export default Test
