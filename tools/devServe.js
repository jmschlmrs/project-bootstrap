/*
 * Start a dev server running client side code proxying the server
 */

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import proxy from 'http-proxy-middleware';
import express from 'express';
import webpackConfig from '../webpack.config.babel';

const devServe = async () => {
  const bundler = webpack(webpackConfig[0]);

  const port = 5555;

  const server = express();

  const serverProxy = proxy({
    target: 'http://localhost:5555',
    secure: false,
    ws: true,
    changeOrigin: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });

  server.use(webpackDevMiddleware(bundler, {
    publicPath: webpackConfig[0].output.publicPath,
    noInfo: true,
    stats: webpackConfig[0].stats,
  }));


  server.use(serverProxy);

  server.listen(port, () => console.log(`The client is running at http://localhost:${port}`)); // eslint-disable-line no-console
};

module.exports = devServe;
