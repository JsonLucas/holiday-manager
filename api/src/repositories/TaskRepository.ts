import { db } from "../constants/prisma";
import { ITask, ITaskRepository, Task } from "../interfaces/Task";

export class TaskRepository implements ITaskRepository {
    public async create(body: Task[]): Promise<boolean> {
        return (await db.task.createMany({ data: body })).count > 0;
    }

    public async update(id: number, body: Task): Promise<ITask> {
        return await db.task.update({ data: body, where: { id } });
    }

    public async delete(id: number): Promise<boolean> {
        return await db.task.delete({ where: { id } }) ? true : false;
    }

    public async massDelete(ids: number[]): Promise<boolean> {
        const aux = await db.task.deleteMany({ 
            where: {
                id: {
                    in: ids
                }
            }
         });
         return aux.count > 0;
    }

    public async getById(id: number, user_id: number): Promise<ITask | null> {
        return await db.task.findUnique({ where: { id, holiday: { user_id } } });
    }

    public async getByHolidayId(holiday_id: number): Promise<Array<ITask>> {
        return await db.task.findMany({ 
            where: { holiday_id }, 
            orderBy: { 
                holiday: { 
                    date: "desc" 
                } 
            } 
        });
    }
}