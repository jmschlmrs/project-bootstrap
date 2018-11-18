import ExecutionEnvironment from 'exenv';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { IS_DEV } from '~/utils/constants';
import reducers from '../reducers';

/* eslint-disable no-underscore-dangle */
// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = ExecutionEnvironment.canUseDOM ? window.__PRELOADED_STATE__ : {};
// Allow the passed state to be garbage-collected
if (ExecutionEnvironment.canUseDOM) delete window.__PRELOADED_STATE__;

const logger = createLogger({ collapsed: true });

// enable redux dev tools if in development and in the browser
const enableReduxDevTools = IS_DEV && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = enableReduxDevTools ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;
/* eslint-enable no-underscore-dangle */

const enhancer = composeEnhancers(
  applyMiddleware(thunk, logger)
);

// Create Redux store with initial state from server
const store = createStore(
  reducers,
  preloadedState,
  enhancer
);

export default store;
