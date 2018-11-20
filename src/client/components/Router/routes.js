import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import App from '../App';
import Home from '../Home';
import NotFound from '../NotFound';

const Router = ( // eslint-disable-line import/no-commonjs
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="notfound" component={NotFound} />
    <Redirect from="*" to="notfound" />
  </Route>
);

export default Router;
