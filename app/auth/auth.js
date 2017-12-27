/**
 * Created by scriptchao on 2017/10/30.
 */

import React from 'react'
import {observable} from 'mobx'
import {inject, observer} from 'mobx-react'
import config from '../../config'
import {splitLocation} from '../public'


@inject('AuthStore') @observer
class Auth extends React.Component {
    constructor(args) {
        super(args);
        this.authStore = this.props.AuthStore;

    }

    componentWillMount() {
        const {code, state} = splitLocation(location);

        this.code = code;
        this.state = state;

        this.getCallback();

    }

    getCallback() {

        let body = {};

        body.code = this.code;

        this.authStore.getAuthCallback(body).then(response => {
            if (response) {

                localStorage.setItem(config.token, response.data.openid);
                location.href = `/${this.state}`
            }
        })
    }


    render() {
        return null
    }
}

export default Auth
