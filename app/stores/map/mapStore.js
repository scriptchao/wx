/**
 * Created by scriptchao on 2017/11/2.
 */
import {observable, action} from 'mobx'
import xhr from '../xhr'

class MapStore {
    @observable address = '';

    constructor() {
        this.mapUrl = '/map';
    }


    @action getMap(body) {

        return xhr({
            method: 'get',
            url: this.mapUrl,
            body: body
        }).then(response => {
            if (response.result) {
                let {x, y} = response.data;

                let map = new BMap.Map("allmap");
                let point = new BMap.Point(x, y);
                let marker = new BMap.Marker(point);
                map.centerAndZoom(point, 12);
                map.enableScrollWheelZoom(true);
                map.addOverlay(marker);
                let gc = new BMap.Geocoder();
                gc.getLocation(point, (rs) => {
                    let addComp = rs.addressComponents;
                    if (rs.business) {
                        this.address = `${addComp.province} ${addComp.city} ${addComp.district} ${rs.business}`
                    } else {
                        this.address = `${addComp.province} ${addComp.city} ${addComp.district} ${addComp.street} ${addComp.streetNumber}`
                    }
                });
                return Promise.resolve(response)
            } else {

            }
        })
    }


}

export default new MapStore