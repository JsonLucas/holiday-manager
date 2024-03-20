export interface IUser{
    id?: number,
    name: string,
    email: string,
    password: string,
}

export type Login = Pick<IUser, "email" | "password">;