import api from './api';

export const getImages = (page = 1) => api.get(`/images?page=${page}`);

export const getImageDetails = (id = 1) => api.get(`/images/${id}`);
