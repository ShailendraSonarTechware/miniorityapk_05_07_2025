
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.minorityownedbusiness.info/api', // Replace with your actual API base URL
  withCredentials: true, // only if backend requires cookies
});

export default api;
