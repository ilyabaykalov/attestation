import axios from 'axios';

const axiosConfig = axios.create({
   baseURL: 'api/',
   responseType: 'json',
   withCredentials: true,
});

axiosConfig.interceptors.request.use((config) => {
   config.headers['api-token'] = process.env.API_TOKEN;

   return config;
});

export default axiosConfig;
