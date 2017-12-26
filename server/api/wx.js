/**
 * Created by scriptchao on 2017/12/19.
 */
import express from 'express'
import auth from './auth'
import menu from './menu'
import chat from './chat'
import map from './map'

const router = express.Router();

router.use('/auth', auth); // 验证相关接口
router.use('/menu', menu); // 菜单相关接口
router.use('/chat', chat); // 公众号验证接口 收发消息接口
router.use('/map',map); // 百度地理位置接口


export default router