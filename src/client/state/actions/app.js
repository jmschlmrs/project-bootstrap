import api from '~/client/state/api';
import actions from '~/client/state/actions';
import { RECEIVED_DATA } from './types';

const getTestData = () => async () => {
  const response = await api.getTestData();

  if (response) actions.receivedTestData(response);

  return response;
};

const receivedTestData = (data) => ({
  type: RECEIVED_DATA,
  data,
});

export {
  getTestData,
  receivedTestData,
};
