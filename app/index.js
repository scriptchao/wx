/**
 * Created by scriptchao on 2017/10/26.
 */

import 'whatwg-fetch'
import React from 'react'
import ReactDom from 'react-dom'
import {Provider} from 'mobx-react'
import Stores from './stores/index'
import App from './routes/index'


ReactDom.render(
    <Provider {...Stores}>
        <App />
    </Provider>,
    document.getElementById('app')
);





