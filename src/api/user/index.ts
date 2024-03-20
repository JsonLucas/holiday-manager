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