import { ISession } from "./Session";

export interface IUser{
    id: number,
    name: string,
    email: string,
    password: string
}

export type User = Omit<IUser, "id">
export type Login = Pick<IUser, "email" | "password">;

export interface IUserRepository {
    create: (body: User) => Promise<IUser>;
    updatePassword: (id: number, password: string) => Promise<IUser>;
    getById: (id: number) => Promise<IUser | null>;
    getByEmail: (email: string) => Promise<IUser | null>;
}

export interface IUserUseCases {
    create: (body: User) => Promise<string>
    login: (email: string, password: string) => Promise<string | null>,
    updatePassword: (id: number, password: string) => Promise<IUser>
    getByEmail: (email: string) => Promise<IUser | null>,
    getSession: (id: string) => Promise<ISession | null>,
    renovateSession: (id: string) => Promise<ISession>,
}