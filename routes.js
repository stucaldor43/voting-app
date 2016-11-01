import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './app/components/App';
import Home from './app/components/Home';

const routes = (
        <Route path='/' component={App}>
          <IndexRoute component={Home}/>
        </Route>
);

export default routes;