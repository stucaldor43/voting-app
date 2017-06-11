import React from 'react';
import ReactDOM from "react-dom";
import {hashHistory} from 'history/createBrowserHistory';
import {Router, Route, IndexRoute} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import MyPolls from "./components/MyPolls";
import Poll from "./components/Poll";
import PollMaker from './components/PollMaker'
import NotFound from './components/NotFound';
import "whatwg-fetch";
import "promise-polyfill";

window.addEventListener("load", () => {
    ReactDOM.render((
        <Router history={hashHistory}>
          <Route path='/' component={ App } onEnter={(nextState, replace, callback) => {
            const queryString = location.search;
            if (queryString.indexOf("oauth_token") >= 0 && 
                queryString.indexOf("oauth_verifier") >= 0) {
                  const query = {};
                  const parameters = queryString.substring(1).split("&");
                  for (const parameter of parameters) {
                    query[parameter.split("=")[0]] = parameter.split("=")[1];
                  }
                  localStorage.setItem("verifier", query["oauth_verifier"]);
            }
            
            fetch(`/api/get_access_token?token=${localStorage.token}&secret=${localStorage.secret}&verifier=${localStorage.verifier}`, {credentials: "same-origin"})
                .then(response => response.json())
                .then((json) => console.log(json.status))
                .then(() => callback());
          }}>
            <IndexRoute component={ Home }/>
            <Route path="/mypolls" component={ MyPolls }/>
            <Route path="/poll/:id" component={ Poll }/>
            <Route path="/poll-creation" component={ PollMaker }/>
            <Route path='*' component={ NotFound }/>
          </Route>
        </Router>), document.getElementById("main"));    
});
