/**
 * Created by scriptchao on 2017/10/26.
 */

import React from 'react'
import {inject, observer} from 'mobx-react'
import {Route, Switch, Redirect, BrowserRouter} from 'react-router-dom'
import {Auth} from '../auth'

@observer
export default class RouteAuth extends React.Component {

    constructor(args) {
        super(args);
    }


    render() {

        return (
            <BrowserRouter basename="/auth">
                <Route path="/" component={Auth} exact/>
            </BrowserRouter>
        )
    }


}