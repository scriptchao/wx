/**
 * Created by scriptchao on 2017/11/2.
 */
import {observable, action} from 'mobx'
import xhr from '../xhr'

class ChatStore {

    constructor() {
        this.chatUrl = '/chat';
    }


    @action postChat(body) {

        return xhr({
            method: 'post',
            url: this.chatUrl,
            body: body
        }).then(response => {
            if (response.result) {
                return Promise.resolve(response)
            } else {

            }
        })
    }

    @action getChat(body) {

        return xhr({
            method: 'get',
            url: this.chatUrl,
            body: body
        }).then(response => {
            if (response.result) {
                return Promise.resolve(response)
            } else {

            }
        })
    }


}

export default new ChatStore