import React from 'react';
import ReactDOM from "react-dom";
import {hashHistory} from 'history/createBrowserHistory';
import {Router, Route, IndexRoute} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import MyPolls from "./components/MyPolls";
import Poll from "./components/Poll";
import NotFound from './components/NotFound';
import "whatwg-fetch";
import "promise-polyfill";

window.addEventListener("load", () => {
    ReactDOM.render((
        <Router history={hashHistory}>
          <Route path="/" onEnter={ () => location.replace("/#/home/?_k=gbfjva")  }>
          <Route path='/home' component={ App }>
            <IndexRoute component={ Home }/>
            <Route path="/mypolls" component={ MyPolls }/>
            <Route path="/poll/:id" component={ Poll }/>
            <Route path='*' component={ NotFound }/>
          </Route>
          </Route>
        </Router>), document.getElementById("main"));    
});
