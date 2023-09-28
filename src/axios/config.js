import axios from 'axios';

const metFetch = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // api url
  headers: {
    'Content-Type': 'application/json',
  },
});

export default metFetch;
