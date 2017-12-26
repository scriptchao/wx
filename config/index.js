/**
 * Created by scriptchao on 2017/12/19.
 */

const devHost = '127.0.0.1';
const prodHost = 'www.scriptchao.com';
const devPort = 8282;
const prodPort = 8080;

export default {
    host: process.env.NODE_ENV === 'development' ? devHost : prodHost,
    port: process.env.NODE_ENV === 'development' ? devPort : prodPort,
    apiHost: process.env.NODE_ENV === 'development' ? devHost : prodHost,
    apiPort: 6060,
    dbHost: '127.0.0.1',
    dbPort: '27017'
}
