import React from 'react';
import ReactDOM from "react-dom";
import {hashHistory} from 'history/createBrowserHistory';
import {Router} from 'react-router'
import routes from './routes';

window.addEventListener("load", () => {
    ReactDOM.render((
        <Router history={hashHistory}>
            {routes}
        </Router>), document.getElementById("main"));    
});
