import axios from 'axios';
import { useLocalStorage } from '../hooks/useLocalStorage';

const { get } = useLocalStorage();
const apiUrl = import.meta.env.VITE_API_URL;
export const api = axios.create({ baseURL: apiUrl });

api.interceptors.request.use((request) => {
    request.headers['x-access-token'] = get("accessToken");
    return request;
});