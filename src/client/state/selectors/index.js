import store from '~/client/state/store';
import * as appSelectors from './app';

const selectors = {
  ...appSelectors,
};

// Read state from store if state is not passed to selector
const selectorsWithStore = {};

Object.keys(selectors).forEach((selectorKey) => {
  selectorsWithStore[selectorKey] = (state) => {
    const stateToUse = state || store.getState();
    return selectors[selectorKey](stateToUse);
  };
});

export default selectorsWithStore;
