import config from '../config';
import api from './api';

export const loadToken = () => api.post('/auth', {
  apiKey: config.API_KEY,
});

export const getImages = (page = 1) => api.get(`/images?page=${page}`);

export const getImageDetails = (id = 1) => api.get(`/images/${id}`);
