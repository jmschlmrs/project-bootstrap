/*
 * Cleans up the output (build) directory.
 */

import del from 'del';
import fs from './lib/fs';

const clean = async () => {
  await del(['.tmp', 'build/*', '!build/.git'], { dot: true });
  await fs.makeDir('build/public');
};

module.exports = clean;
