/**
 * Created by scriptchao on 2017/12/26.
 */

import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    openid: String,
    nickname: String, // from weixin 昵称,
    sex: String, // from weixin 性别 0->女 1->男
    language: String, // from weixin 语言
    city: String, // from weixin 城市
    province: String, // from weixin
    country: String, // from weixin
    imgUrl: String, // from weixin 头像路径
}, {
    timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}
});

export default userSchema
