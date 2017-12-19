/**
 * Created by scriptchao on 2017/12/19.
 */

const devHost = '127.0.0.1';
const prodHost = '101.132.163.117';
const devPort = 8282;
const prodPort = 80;

export default {
    host: process.env.NODE_ENV === 'development' ? devHost : prodHost,
    port: process.env.NODE_ENV === 'development' ? devPort : prodPort,
    apiHost: process.env.NODE_ENV === 'development' ? devHost : prodHost,
    apiPort: 6060
}
