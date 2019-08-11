import axios from 'axios';

let baseURL = 'http://localhost:8080/graphql';

if (process.env.NODE_ENV === 'production') {
  baseURL = 'https://insapient-api.herokuapp.com/graphql';
}

const makeRequest = data => {
  return axios.post(baseURL, data);
};

export default makeRequest;
