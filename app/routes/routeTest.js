/**
 * Created by scriptchao on 2017/10/26.
 */

import React from 'react'
import {inject, observer} from 'mobx-react'
import {Route, Switch, Redirect, BrowserRouter} from 'react-router-dom'
import {Test} from '../test'

@observer
export default class RouteTest extends React.Component {

    constructor(args) {
        super(args);
    }


    render() {

        return (
            <BrowserRouter basename="/test">
                <Route path="/" component={Test} exact/>
            </BrowserRouter>

        )
    }


}