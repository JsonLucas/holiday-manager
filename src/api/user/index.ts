import { api } from "..";
import { IUser, Login } from "../../interfaces/user";

export const signUpRequest = async (body: IUser) => {
    const { data } = await api.post('/signup', body);
    return data;
}

export const loginRequest = async (body: Login) => {
    const { data } = await api.post('/login', body);
    return data;
}

export const updatePasswordRequest = async (email: string, password: string) => {
    const { data } = await api.patch(`/forgot-password`, { email, password });
    return data;
}

export const verificateEmailRequest = async (email: string) => {
    const { data } = await api.post('/verificate-email', { email });
    return data;
}