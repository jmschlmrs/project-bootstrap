import request from '~/utils/apiClient';

const getTestData = () => request('https://jsonplaceholder.typicode.com/todos/1');

export {
  getTestData,
};
