import { BAD_REQUEST, INVALID_DATA_FORMAT } from "../helpers/httpResponses/generic";
import { Validator } from "../helpers/validator";
import { HttpRequest, HttpResponse, NextFunction } from "../interfaces/Http";
import { taskSchema } from "../utils/schemas/holidaySchemas";

export class TaskMiddleware {
    constructor(private readonly validator: Validator){ }

    public async validateUpdateTaskPayload(req: HttpRequest, res: HttpResponse, next: NextFunction) {
        const { body } = req;
        if(!body) return res.status(BAD_REQUEST.code).send({ message: INVALID_DATA_FORMAT.message });

        const validation = await this.validator.validate(body, taskSchema);
        if(!validation) return res.status(INVALID_DATA_FORMAT.code).send({ message: INVALID_DATA_FORMAT.message });

        next();
    }
    
    public async validateCreateTaskPayload(req: HttpRequest, res: HttpResponse, next: NextFunction) {
        const { body } = req;
        if(!body || !Array.isArray(body)) return res.status(BAD_REQUEST.code).send({ message: INVALID_DATA_FORMAT.message });

        for(let i of body){
            const validation = await this.validator.validate(i, taskSchema);
            if(!validation) return res.status(INVALID_DATA_FORMAT.code).send({ message: INVALID_DATA_FORMAT.message });
        }

        next();
    }
}