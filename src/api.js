import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '' 
  : 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const galleryAPI = {
  getAll: () => api.get('/api/gallery'),
  getById: (id) => api.get(`/api/gallery/${id}`),
};

export const contactAPI = {
  submit: (data) => api.post('/api/contact', data),
  getAll: () => api.get('/api/admin/contacts'),
  markAsRead: (id) => api.put(`/api/admin/contacts/${id}/read`),
  delete: (id) => api.delete(`/api/admin/contacts/${id}`),
};

export default api;