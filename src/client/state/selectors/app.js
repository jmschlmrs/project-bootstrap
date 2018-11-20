import { createSelector } from 'reselect';

const appState = (state) => state.app;

const testData = createSelector(
  [appState],
  (app) => app.testData
);

export {
  testData,
};
