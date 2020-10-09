import axios from 'axios';
import config from '../config';
import { loadToken } from './requests';

const api = axios.create({
  baseURL: config.API_BASE_URL,
});


try {

} catch (e) {
  console.log(e);
}
api.interceptors.request.use(async (axiosConfig) => {
  let token = localStorage.getItem('token');

  if (!token) {
    const { token: refreshedToken } = await loadToken();
    token = refreshedToken;
    localStorage.setItem('token', refreshedToken);
  }

  return {
    ...axiosConfig,
    headers: {
      ...axiosConfig.headers,
      Authorization: `Bearer ${token}`,
    },
  };
});

api.interceptors.response.use(({ data }) => data);

export default api;
