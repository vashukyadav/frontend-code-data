import axios from 'axios';

const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://backend-code-2-46th.onrender.com'   // 🔹 Render backend URL
    : 'http://localhost:5000';                   // 🔹 Local development ke liye

console.log('API Base URL:', API_BASE_URL);
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
