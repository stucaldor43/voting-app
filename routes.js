import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './app/components/App';
import Home from './app/components/Home';
import NotFound from './app/components/NotFound';

const routes = (
        <Route path='/' component={App}>
          <IndexRoute component={Home}/>
          <Route path='*' component={NotFound}/>
        </Route>
);

export default routes;