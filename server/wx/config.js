/**
 * Created by scriptchao on 2017/12/19.
 */

const token = 'scriptchao2017';
const appId = 'wxe08322042000750c';
// const appId = 'wxc568eb37e4f5302a';
const appSecret = 'f05865d4304020cfa6c99a052bfed8aa';
// const appSecret = 'e9956be4176cb0c0c1909bbd5a947ab4';
const apiDomain = 'https://api.weixin.qq.com';
const domain = 'http://scriptchao.viphk.ngrok.org';
const scope = 'snsapi_userinfo';

export default {
    token: token,
    appId: appId,
    domain: domain,
    appSecret: appSecret,
    apiDomain: apiDomain,
    scope: scope,
    apiUrl: {
        accessTokenUrl: `${apiDomain}/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`,
        createMenuUrl: `${apiDomain}/cgi-bin/menu/create`,
        ticketUrl: `${apiDomain}/cgi-bin/ticket/getticket`,
    }
}
