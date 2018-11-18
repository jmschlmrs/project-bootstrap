import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import store from './state/store';
import routes from './components/Router/routes';
import './css/styles.scss';

injectTapEventPlugin(); // Needed for onTouchTap http://stackoverflow.com/a/34015469/988941

const rootElement = document.getElementById('content');

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <Router routes={routes} history={browserHistory} />
    </Provider>
  </AppContainer>,
  rootElement
);
