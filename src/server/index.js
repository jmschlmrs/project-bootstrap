import 'babel-polyfill';
import express from 'express';
import 'css-modules-require-hook/preset';
import path from 'path';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import injectTapEventPlugin from 'react-tap-event-plugin';
import webpackConfig from '../../webpack.config.babel';
import api from './api';
import serverRenderHandler from './render';

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
// server favicon for browser
app.use(favicon(path.join(__dirname, '../public/assets', 'favicon.ico')));
// server static assets like images, etc
app.use(express.static(path.join(__dirname, '../public')));
// handle api requests
app.use('/api', api);
// otherwise assume we want an html response, server render react app
app.use(serverRenderHandler);

// have our expres app listen on a port for http requests
app.listen(5555, (err) => {
  if (err) return err;
  return console.log('App ready at http://localhost:5555'); // eslint-disable-line no-console
});
