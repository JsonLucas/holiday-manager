import { ISession, ISessionRepository } from "../interfaces/Session";
import { IUser, IUserRepository, IUserUseCases, User } from "../interfaces/User";
import { ICrypto } from "../interfaces/Utilities";

export class UserUseCases implements IUserUseCases {
    constructor(private userRepository: IUserRepository, private sessionRepository: ISessionRepository, private crypto: ICrypto){ }

    public async create(body: User): Promise<string> {
        const hashPassword = this.crypto.encrypt(body.password);
        const user = await this.userRepository.create({ ...body, password: hashPassword });
        
        const { id } = await this.sessionRepository.create(user.id);
        return id;
    }

    public async login(email: string, password: string): Promise<string | null> {
        const user = await this.getByEmail(email);
        const hashPassword = this.crypto.encrypt(password);
        if(user) {
            if(this.crypto.compare(user.password, hashPassword)) {
                const { id } = await this.sessionRepository.create(user.id);
                return id
            };
        }

        return null;
    }

    public async updatePassword(id: number, password: string): Promise<IUser> {
        const hashPassword = this.crypto.encrypt(password);
        return await this.userRepository.updatePassword(id, hashPassword);
    }

    public async getByEmail(email: string): Promise<IUser | null> {
        return await this.userRepository.getByEmail(email);
    }

    public async getSession(id: string): Promise<ISession | null>{
        return await this.sessionRepository.getById(id);
    }

    public async renovateSession(id: string): Promise<ISession> {
        return await this.sessionRepository.update(id);
    }
}