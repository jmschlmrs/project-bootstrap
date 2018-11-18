/*
 * Copies static files such as robots.txt, favicon.ico to the
 * output (build) folder.
 */

import replace from 'replace';
import ncp from 'ncp';
import Promise from 'bluebird';

const copy = async () => {
  const ncpPromise = Promise.promisify(ncp);

  await Promise.all([
    ncpPromise('assets', 'build/public'),
    ncpPromise('package.json', 'build/package.json'),
  ]);

  replace({
    regex: '"start".*',
    replacement: '"start": "node server",',
    paths: ['build/package.json'],
    recursive: false,
    silent: false,
  });
};

module.exports = copy;
