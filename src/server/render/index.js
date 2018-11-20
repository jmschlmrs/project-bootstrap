import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { createRoutes, match, RouterContext } from 'react-router';
import reactCookie from 'react-cookie';
import reducers from '~/client/state/reducers';
import routes from '~/client/components/Router/routes';

const serverRender = (req, res) => {
  // Ensures react has access to the cookies sent with this request
  reactCookie.plugToRequest(req, res);

  // Server Side Rendering, create a new Redux store instance
  const store = createStore(reducers);
  // Grab the initial state from our Redux store
  const preloadedAppState = store.getState();

  const renderFullPage = (html, preloadedState) => (
    `
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="stylesheet" href="/main.css">
        </head>
        <body>
          <div id="content">${html}</div>
          <script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}</script>
          <script src="/main.js"></script>
        </body>
      </html>
      `
  );

  const routerLocation = {
    pathname: req.originalUrl,
    search: '',
    query: req.query,
    state: {},
    action: null,
    key: '',
  };
  // match the routes to the url so we know what components to render for server render
  match({ routes: createRoutes(routes), location: routerLocation }, (err, redirect, props) => {
    // `RouterContext` is what the `Router` renders. `Router` keeps these
    // `props` in its state as it listens to `browserHistory`. But on the
    // server our app is stateless, so we need to use `match` to
    // get these props before rendering

    // Render the component to a string
    const resHtml = renderToString(
      <Provider store={store}>
        <RouterContext {...props} />
      </Provider>
    );

    // Send the rendered page back to the client
    res.send(renderFullPage(resHtml, preloadedAppState));
  });
};

export default serverRender;
