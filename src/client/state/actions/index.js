import store from '~/client/state/store';
import * as appActions from './app';

const actions = {
  ...appActions,
};

const actionsWithDispatch = {};

// Wrap all actions with dispatch
Object.keys(actions).forEach((actionKey) => {
  actionsWithDispatch[actionKey] = (args) => {
    const actionPayload = actions[actionKey](args);

    return actionPayload ? store.dispatch(actionPayload) : null;
  };
});

export default actionsWithDispatch;
