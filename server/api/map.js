/**
 * Created by scriptchao on 2017/12/25.
 */

import express from 'express'
import {httpGet} from '../request'
import {responseClient} from '../util'

const router = express.Router();

router.get('/', (req, res) => {
    const {longitude, latitude} = req.query;
    httpGet(`http://api.map.baidu.com/geoconv/v1/?coords=${longitude},${latitude}&from=1&to=5&ak=0TYU4HF7WOu6BdiPhzAG9GUuLfWj9aj5`).then(data => {
        console.log(data);

        const {result} = JSON.parse(data);
        let geoInfo = {};
        geoInfo.x = result[0].x;
        geoInfo.y = result[0].y;
        responseClient(res, 200, 1, '获取地理位置信息成功!', geoInfo)
    })

});

export default router
