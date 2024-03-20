export interface ISession {
    id: string,
    user_id: number,
    last_access: Date,
    is_active: boolean
}

export interface ISessionRepository {
    create: (user_id: number) => Promise<ISession>
    update: (id: string) => Promise<ISession>
    delete: (id: string) => Promise<boolean>
    deleteAllUserSessions: (user_id: number) => Promise<boolean>
    getById: (id: string) => Promise<ISession | null>
}

export interface ISessionMiddleware {
    generateAccessKey: (user_id: number) => void
    updateAccessKey: (id: string) => void
    excludeAccessKey: (id: string) => void 
}