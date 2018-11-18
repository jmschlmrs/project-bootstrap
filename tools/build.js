/*
 * Compiles the project from source files into a distributable
 * format and copies it to the output (build) folder.
 */

import run from './run';
import clean from './clean';
import copy from './copy';
import bundle from './bundle';

const build = async () => {
  await run(clean);
  await run(copy);
  await run(bundle);
};

module.exports = build;
