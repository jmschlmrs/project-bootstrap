import 'babel-polyfill';
import express from 'express';
import 'css-modules-require-hook/preset';
import path from 'path';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';
import reactCookie from 'react-cookie';
import cookieParser from 'cookie-parser';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { createRoutes, match, RouterContext } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import reducers from '~/client/state/reducers';
import routes from '~/client/components/Router/routes';
import webpackConfig from '../../webpack.config.babel';
import api from './api';

const isProd = (process.env.NODE_ENV === 'production');
const app = express();
const compiler = webpack(webpackConfig[0]);

injectTapEventPlugin(); // Needed for onTouchTap http://stackoverflow.com/a/34015469/988941

if (!isProd) {
  app.use(webpackDevMiddleware(compiler, {
    publicPath: '/', // Same as output.publicPath
  }));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(favicon(path.join(__dirname, '../public/assets', 'favicon.ico')));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', api);

app.use((req, res) => {
  // Ensures react has access to the cookies sent with this request
  reactCookie.plugToRequest(req, res);

  // Server Side Rendering, create a new Redux store instance
  const store = createStore(reducers);
  // Grab the initial state from our Redux store
  const preloadedAppState = store.getState();

  const renderFullPage = (html, preloadedState, pageHead) => (
    `
      <!doctype html>
      <html lang="en" ${pageHead.htmlAttributes.toString()}>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          ${pageHead.meta.toString()}
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
            <link rel="stylesheet" href="/main.css">
          ${pageHead.link.toString()}
          ${pageHead.title.toString()}
        </head>
        <body ${pageHead.bodyAttributes.toString()}>
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
});

app.listen(5555, (err) => {
  if (err) return err;

  return console.log('App ready at http://localhost:5555'); // eslint-disable-line no-console
});
