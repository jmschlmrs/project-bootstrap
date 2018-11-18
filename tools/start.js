import build from './build';
import devServe from './devServe';
import serve from './serve';
import run from './run';

global.WATCH = true;

const start = async () => {
  await run(build);
  await run(serve);
  await run(devServe);
};

module.exports = start;
