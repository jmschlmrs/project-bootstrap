/*
 * Helper function that runs a specified module and record start and end times
 */

const format = (time) => time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');

const run = async (fn, options) => {
  const start = new Date();

  console.log(`[${format(start)}] Starting '${fn.name}'...`); // eslint-disable-line no-console
  await fn(options);

  const end = new Date();
  const time = end.getTime() - start.getTime();

  console.log(`[${format(end)}] Finished '${fn.name}' after ${time} ms`);// eslint-disable-line no-console
};

if (process.mainModule.children.length === 0 && process.argv.length > 2) {
  delete require.cache[__filename];
  const module = process.argv[2];

  run(require(`./${module}.js`)).catch((err) => console.error(err.stack)); // eslint-disable-line
}

module.exports = run;
