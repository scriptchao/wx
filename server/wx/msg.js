/**
 * Created by scriptchao on 2017/12/20.
 */

export function txtMsg(toUser, fromUser, content) {
    let xmlContent = "<xml><ToUserName><![CDATA[" + toUser + "]]></ToUserName>";
    xmlContent += "<FromUserName><![CDATA[" + fromUser + "]]></FromUserName>";
    xmlContent += "<CreateTime>" + new Date().getTime() + "</CreateTime>";
    xmlContent += "<MsgType><![CDATA[text]]></MsgType>";
    xmlContent += "<Content><![CDATA[" + content + "]]></Content></xml>";
    return xmlContent;
}

export function imgMsg(toUser,fromUser,mediaId) {
    let xmlContent = "<xml><ToUserName><![CDATA[" + toUser + "]]></ToUserName>";
    xmlContent += "<FromUserName><![CDATA[" + fromUser + "]]></FromUserName>";
    xmlContent += "<CreateTime>" + new Date().getTime() + "</CreateTime>";
    xmlContent += "<MsgType><![CDATA[image]]></MsgType>";
    xmlContent += "<Image><MediaId><![CDATA[" + mediaId + "]]></MediaId></Image></xml>";
    return xmlContent;

}

export function graphicMsg(toUser, fromUser, contentArr) {
    let xmlContent = "<xml><ToUserName><![CDATA[" + toUser + "]]></ToUserName>";
    xmlContent += "<FromUserName><![CDATA[" + fromUser + "]]></FromUserName>";
    xmlContent += "<CreateTime>" + new Date().getTime() + "</CreateTime>";
    xmlContent += "<MsgType><![CDATA[news]]></MsgType>";
    xmlContent += "<ArticleCount>" + contentArr.length + "</ArticleCount>";
    xmlContent += "<Articles>";
    contentArr.map(function (item, index) {
        xmlContent += "<item>";
        xmlContent += "<Title><![CDATA[" + item.title + "]]></Title>";
        xmlContent += "<Description><![CDATA[" + item.description + "]]></Description>";
        xmlContent += "<PicUrl><![CDATA[" + item.picUrl + "]]></PicUrl>";
        xmlContent += "<Url><![CDATA[" + item.url + "]]></Url>";
        xmlContent += "</item>";
    });
    xmlContent += "</Articles></xml>";
    return xmlContent;
}