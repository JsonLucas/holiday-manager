import axios from 'axios';
import { useLocalStorage } from '../hooks/useLocalStorage';

const { get } = useLocalStorage();
export const api = axios.create({ baseURL: "http://localhost:5000" });

api.interceptors.request.use((request) => {
    request.headers['x-access-token'] = get("accessToken");
    return request;
});