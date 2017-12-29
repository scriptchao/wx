/**
 * Created by scriptchao on 2017/12/19.
 */

const devHost = '127.0.0.1';
// const prodHost = '127.0.0.1';
const prodHost = 'www.scriptchao.xyz';
const devPort = 8282;
// const prodPort = 8282;
const prodPort = 80;

const token = 'scriptchao2017';
const apiDomain = 'https://api.weixin.qq.com';

// production
const appId = 'wxe08322042000750c';
const appSecret = 'f05865d4304020cfa6c99a052bfed8aa';
const domain = 'http://www.scriptchao.xyz';

// production ref
// const appId = 'wxc568eb37e4f5302a';
// const appSecret = 'e9956be4176cb0c0c1909bbd5a947ab4';
// const domain = 'http://www.scriptchao.xyz';

// development
// const appId = 'wxc568eb37e4f5302a';
// const appSecret = 'e9956be4176cb0c0c1909bbd5a947ab4';
// const domain = 'http://scriptchao.viphk.ngrok.org';



const scope = 'snsapi_userinfo';
// const scope = 'snsapi_base';

export default {
    host: process.env.NODE_ENV === 'development' ? devHost : prodHost,
    port: process.env.NODE_ENV === 'development' ? devPort : prodPort,
    apiHost: process.env.NODE_ENV === 'development' ? devHost : prodHost,
    apiPort: 6060,
    dbHost: '127.0.0.1',
    dbPort: '27017',

    token: token,
    appId: appId,
    appSecret: appSecret,
    domain: domain,
    apiDomain: apiDomain,
    scope: scope,
    apiUrl: {
        accessTokenUrl: `${apiDomain}/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`,
        createMenuUrl: `${apiDomain}/cgi-bin/menu/create`,
        ticketUrl: `${apiDomain}/cgi-bin/ticket/getticket`,
        redirectUrl: `https://open.weixin.qq.com/connect/oauth2/authorize`
    }
}
