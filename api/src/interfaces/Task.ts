export interface ITask{
    id: number,
    title: string,
    description: string | null,
    holiday_id: number
}

export type Task = Omit<ITask, 'id'>;

export interface ITaskRepository {
    create: (body: Task[]) => Promise<boolean>;
    update: (id: number, body: Task) => Promise<ITask>;
    delete: (id: number) => Promise<boolean>;
    massDelete: (ids: number[]) => Promise<boolean>;
    getById: (id: number, user_id: number) => Promise<ITask | null>;
    getByHolidayId: (holiday_id: number) => Promise<ITask[]>;
}

export interface ITaskUseCases {
    create: (body: Task[]) => Promise<boolean>
    update: (id: number, body: Task) => Promise<ITask>
    delete: (id: number) => Promise<boolean>
    massDelete: (ids: number[]) => Promise<boolean>
    getByHolidayId: (holiday_id: number) => Promise<ITask[] | null>
}