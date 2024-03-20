import { ITask, ITaskRepository, ITaskUseCases, Task } from "../interfaces/Task";

export class TaskUseCases implements ITaskUseCases {
    constructor(private readonly taskRepository: ITaskRepository){ }

    public async create(body: Task[]): Promise<boolean> {
        const holidayExists = await this.taskRepository.getByHolidayId(body[0].holiday_id);
        if(!holidayExists) return false;

        let tasks: Task[] = [];
        body.forEach((item) => {
            if(!holidayExists.some(task => task.title.toLowerCase().includes(item.title.toLowerCase()))) tasks.push(item);
        });

        return await this.taskRepository.create(tasks);
    }

    public async getByHolidayId(holiday_id: number): Promise<ITask[] | null> {
        const tasks = await this.taskRepository.getByHolidayId(holiday_id);
        return tasks ?? [];
    }

    public async update(id: number, body: Task): Promise<ITask> {
        return await this.taskRepository.update(id, body);
    }

    public async delete(id: number): Promise<boolean> {
        return await this.taskRepository.delete(id);
    }

    public async massDelete(ids: number[]): Promise<boolean> {
        return await this.taskRepository.massDelete(ids);
    }
}