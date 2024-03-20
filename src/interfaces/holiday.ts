export interface IHoliday{
    id: number,
    title: string,
    description: string | null | undefined,
    coordinates: string,
    date: Date,
    user_id: number
}

export interface ITask {
    id: number,
    title: string,
    description: string | undefined,
    holiday_id: number
}

export type Holiday = Omit<IHoliday, "id" | "user_id">;
export type Task = Omit<ITask, "id">;
export type TaskManipulation = Omit<Task, "holiday_id">;