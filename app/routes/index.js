/**
 * Created by scriptchao on 2017/12/27.
 */

import React from 'react'
import {inject, observer} from 'mobx-react'
import RouteAuth from './routeAuth'
import RouteTest from './routeTest'

@observer
class App extends React.Component {

    constructor(args) {
        super(args);
    }
    

    render() {

        return (
            <div className="WX">
                <RouteAuth />
                <RouteTest />
            </div>
        )
    }
}

export default App
