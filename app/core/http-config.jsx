import axios from 'axios';

const httpService = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', 
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
});


export default httpService;
