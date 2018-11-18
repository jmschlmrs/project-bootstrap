/*
 * Runs webpack for both app configs from 'webpack.config.babel.js'
 */

import webpack from 'webpack';
import webpackConfigs from '../webpack.config.babel';

// Runs webpack for both app configs from 'webpack.config.babel.js'
const bundle = () =>
  new Promise((resolve, reject) => {
    const bundler = webpack(webpackConfigs);

    // Gets called when webpack finishes
    const onComplete = (err) => {
      if (err) {
        console.log('webpack error: ', err); // eslint-disable-line no-console
        return reject(err);
      }
      return resolve();
    };

    // Recompile automatically on changes if watch is set
    if (global.WATCH) {
      bundler.watch({
        aggregateTimeout: 300,
        poll: true,
      }, onComplete);
    } else {
      bundler.run(onComplete);
    }
  });

module.exports = bundle;
