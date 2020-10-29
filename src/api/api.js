import axios from 'axios';
import config from '../config';

const api = axios.create({
  baseURL: config.API_BASE_URL,
});

const loadToken = () => api.post('/auth', {
  apiKey: config.API_KEY,
});

const refreshToken = async () => {
  const { token } = await loadToken();

  localStorage.setItem('token', token);

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
