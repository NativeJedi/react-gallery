import axios from 'axios';
import config from '../config';

const apiConfig = {
  baseURL: config.API_BASE_URL,
};

const loadToken = async () => {
  const { data } = await axios.post('/auth', {
    apiKey: config.API_KEY,
  }, apiConfig);

  return data.token;
};

const api = axios.create(apiConfig);

const refreshToken = async () => {
  const token = await loadToken();

  if (token) {
    localStorage.setItem('token', token);
  }

  return token;
};

api.interceptors.request.use(async (axiosConfig) => {
  const localToken = localStorage.getItem('token');

  const token = localToken || await refreshToken();

  return {
    ...axiosConfig,
    headers: {
      ...axiosConfig.headers,
      Authorization: `Bearer ${token}`,
    },
  };
});

api.interceptors.response.use(
  ({ data }) => data,
  async (error) => {
    const { config: originalRequest, response } = error;

    if (response.status === 401) {
      try {
        await refreshToken();
      } catch (e) {
        return e;
      }

      return api(originalRequest);
    }

    return error;
  },
);

export default api;
