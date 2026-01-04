import axios from 'axios';

const api = axios.create({
    baseURL: 'https://creative-showcase-7yp2.onrender.com/api',
});

// Add a request interceptor to include the token
api.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
