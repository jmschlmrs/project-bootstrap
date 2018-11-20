import 'isomorphic-fetch';

const parseJSON = async (response) => {
  const jsonResponse = await response.json();
  jsonResponse.status = response.status;

  return jsonResponse;
};

const defaultHeaders = {
  'Content-Type': 'application/json',
  method: 'GET',
};

const fetchRequest = (url, config = {}) => {
  const requestConfig = Object.assign({}, { headers: defaultHeaders }, config);
  if (config.body && requestConfig.headers['Content-Type'] === 'application/json') {
    requestConfig.body = JSON.stringify(config.body);
  }

  return fetch(url, requestConfig)
    .then(parseJSON)
    .then((response) => response);
};

export default fetchRequest;
