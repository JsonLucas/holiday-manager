import { BAD_REQUEST, INVALID_DATA_FORMAT } from "../helpers/httpResponses/generic";
import { HttpRequest, HttpResponse, NextFunction } from "../interfaces/Http";
import { holidaySchema } from "../utils/schemas/holidaySchemas";
import { Validator } from "../helpers/validator";

export class HolidayMiddleware {
    constructor(private readonly validator: Validator){ }

    public async validateCreateHolidayPayload(req: HttpRequest, res: HttpResponse, next: NextFunction) {
        const { body } = req;
        if(!body || !Array.isArray(body)) return res.status(BAD_REQUEST.code).send({ message: INVALID_DATA_FORMAT.message });

        for(let i of body){
            if(!await this.validator.validate(i, holidaySchema)) return res.status(INVALID_DATA_FORMAT.code).send({ message: INVALID_DATA_FORMAT.message });
        }

        next();
    }

    public async validateUpdateHolidayPayload(req: HttpRequest, res: HttpResponse, next: NextFunction) {
        const { body } = req;
        if(!body) return res.status(BAD_REQUEST.code).send({ message: INVALID_DATA_FORMAT.message });

        if(!await this.validator.validate(body, holidaySchema)) return res.status(INVALID_DATA_FORMAT.code).send({ message: INVALID_DATA_FORMAT.message });

        next();
    }

    public async validateMassDelete(req: HttpRequest, res: HttpResponse, next: NextFunction) {
        const { body } = req;
        if(!body || !Array.isArray(body) || body.length === 0) return res.status(BAD_REQUEST.code).send({ message: INVALID_DATA_FORMAT.message });

        for(let i of body){
            if(isNaN(i)) return res.status(INVALID_DATA_FORMAT.code).send({ message: INVALID_DATA_FORMAT.message });
        }

        next();
    }
}