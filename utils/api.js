
import axios from 'axios';

const API_URL ="http://192.168.0.104:3001/api";
  // process.env.EXPO_PUBLIC_API_URL || "http://localhost:3001/api";

const api = axios.create({
  
  // baseURL: 'https://api.minorityownedbusiness.info/api', // Replace with your actual API base URL
  // baseURL: 'http://localhost:3001/api',

  
  baseURL: API_URL,

  withCredentials: true, // only if backend requires cookies
});
// Attach token to every request automatically
// api.interceptors.request.use(
//   async (config) => {
//     const token = await AsyncStorage.getItem("authToken");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );
export default api;
