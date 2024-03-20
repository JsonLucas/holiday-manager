import { StatusCodes } from "../helpers/enums/statusCodes";
import { BAD_REQUEST, INVALID_PARAM } from "../helpers/httpResponses/generic";
import { CREATED_TASK, DELETED_TASK, TASK_NOT_FOUND, UPDATED_TASK } from "../helpers/httpResponses/task";
import { HttpRequest, HttpResponse, NextFunction } from "../interfaces/Http";
import { ITaskUseCases, Task } from "../interfaces/Task";

export class TaskController {
    constructor(private readonly taskUseCases: ITaskUseCases){ }

    public async create(req: HttpRequest, res: HttpResponse, next?: NextFunction) {
        const { body } = req;
        const { holiday_id } = res.locals;
        const tasks = body.map((item: Task) => ({ ...item, holiday_id }));
        await this.taskUseCases.create(tasks);

        res.status(CREATED_TASK.code).send({ message: CREATED_TASK.message });
    }

    public async update(req: HttpRequest, res: HttpResponse, next?: NextFunction) {
        const { taskId } = req.params;
        const { body } = req;
        await this.taskUseCases.update(Number(taskId), body as Task);
        res.status(UPDATED_TASK.code).send({ message: UPDATED_TASK.message });
    }

    public async delete(req: HttpRequest, res: HttpResponse, next?: NextFunction) {
        const { taskId } = req.params;
        await this.taskUseCases.delete(Number(taskId));
        res.status(DELETED_TASK.code).send({ message: DELETED_TASK.message });
    }

    public async massDelete(req: HttpRequest, res: HttpResponse, next?: NextFunction) {
        const { body } = req;
        const remove = await this.taskUseCases.massDelete(body as number[]);
        
        if(remove) res.status(DELETED_TASK.code).send({ message: DELETED_TASK.message });
        else res.status(BAD_REQUEST.code).send({ message: BAD_REQUEST.message });
    }

    public async getById(req: HttpRequest, res: HttpResponse, next?: NextFunction) {
        const { taskId } = req.params;
        const { holiday_id } = res.locals;
        if(!taskId || isNaN(taskId)) return res.status(INVALID_PARAM.code).send({ message: INVALID_PARAM.message });

        const tasks = await this.taskUseCases.getByHolidayId(holiday_id);
        const singleTask = tasks?.find((item) => item.id === Number(taskId));
        if(!singleTask) return res.status(TASK_NOT_FOUND.code).send({ message: TASK_NOT_FOUND.message });

        if(next) return next();

        res.status(StatusCodes.REQUEST_OK).send(singleTask);
    }

    public async getAll(req: HttpRequest, res: HttpResponse, next?: NextFunction) {
        const { holiday_id } = res.locals;
        const tasks = await this.taskUseCases.getByHolidayId(holiday_id);
        res.status(StatusCodes.REQUEST_OK).send(tasks);
    }
}