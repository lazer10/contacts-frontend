import axios from 'axios';

export default axios.create({
  baseURL: 'https://contacts-test-api.herokuapp.com/api/v1',
});

export const config = {
  headers: {
    ContentType: 'application/json',
  },
};
