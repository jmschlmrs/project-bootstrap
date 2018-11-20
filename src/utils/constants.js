import ExecutionEnvironment from 'exenv';

const getEnvironment = () => {
  // Browser
  if (ExecutionEnvironment.canUseDom) return window.__ENV__ || 'development';
  // Server side
  return process.env.NODE_ENV || 'development';
};

const IS_DEV = getEnvironment();

export {
  IS_DEV,
};
