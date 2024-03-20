import { db } from "../constants/prisma";
import { IUser, IUserRepository, User } from "../interfaces/User";

export class UserRepository implements IUserRepository {
    public async create (body: User): Promise<IUser>{
        return await db.user.create({ data: body });
    }

    public async updatePassword (id: number, password: string): Promise<IUser> {
        return await db.user.update({ data: { password }, where: { id } });
    }

    public async getById (id: number): Promise<IUser | null> {
        return await db.user.findUnique({ where: { id } });
    }

    public async getByEmail (email: string): Promise<IUser | null> {
        return await db.user.findUnique({ where: { email } });
    }
}