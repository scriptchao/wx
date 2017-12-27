/**
 * Created by scriptchao on 2017/11/22.
 */

export default function splitLocation(location) {
    let data = {};

    location.search.slice(1).split('&').map((value) => data[value.split('=')[0]] = value.split('=')[1]);

    return data
}