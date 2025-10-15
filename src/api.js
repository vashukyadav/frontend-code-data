import axios from 'axios';

const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? (process.env.REACT_APP_API_URL || 'https://backend-code-1-nctw.onrender.com')
    : 'http://localhost:5000';

console.log('API Base URL:', API_BASE_URL);
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000
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
