import { combineReducers } from 'redux';

const initialState = {};

const appReducer = (state = initialState.app, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

export default combineReducers({
  app: appReducer,
});
