import { RECEIVED_DATA } from '~/client/state/actions/types';
import initialState from './initialState';

const appReducer = (state = initialState.app, action) => {
  switch (action.type) {
    case RECEIVED_DATA: {
      if (action.data) {
        const newState = Object.assign({}, state, {
          testData: action.data,
        });
        return newState;
      }
      return state;
    }

    default: {
      return state;
    }
  }
};

export default appReducer;
