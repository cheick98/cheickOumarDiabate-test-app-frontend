// lib/axios.ts
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-staging.supmanagement.ml',
});

export default api;
