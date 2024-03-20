import { StatusCodes } from "../helpers/enums/statusCodes";
import { BAD_REQUEST, INVALID_PARAM } from "../helpers/httpResponses/generic";
import { CREATED_HOLIDAY, DELETED_HOLIDAY, HOLIDAY_ALREADY_CREATED, HOLIDAY_NOT_FOUND, SUCCESSFULY_GET_HOLIDAYS, UPDATED_HOLIDAY } from "../helpers/httpResponses/holiday";
import { Holiday, IHolidayUseCases } from "../interfaces/Holiday";
import { HttpRequest, HttpResponse, NextFunction } from "../interfaces/Http";

export class HolidayController {
    constructor(private holidayUseCases: IHolidayUseCases){ }

    public async create(req: HttpRequest, res: HttpResponse, next?: NextFunction){
        const { user_id } = res.locals;
        const { body } = req;
        const holidays = body.map((item: Holiday) => ({ ...item, user_id }));
        const created = await this.holidayUseCases.create(holidays)

        if(created) return res.status(CREATED_HOLIDAY.code).send({ message: CREATED_HOLIDAY.message });
        res.status(HOLIDAY_ALREADY_CREATED.code).send({ message: HOLIDAY_ALREADY_CREATED.message });
    }

    public async update(req: HttpRequest, res: HttpResponse, next?: NextFunction){
        const { body } = req;
        const { id } = req.params
        await this.holidayUseCases.update(Number(id), body as Holiday);

        res.status(UPDATED_HOLIDAY.code).send({ message: UPDATED_HOLIDAY.message });
    }

    public async delete(req: HttpRequest, res: HttpResponse, next?: NextFunction){
        const { id } = req.params;
        await this.holidayUseCases.delete(Number(id));
        res.status(DELETED_HOLIDAY.code).send({ message: DELETED_HOLIDAY.message });
    }

    public async massDelete(req: HttpRequest, res: HttpResponse, next?: NextFunction) {
        const { body } = req;
        const remove = await this.holidayUseCases.massDelete(body as number[]);
        
        if(remove) res.status(DELETED_HOLIDAY.code).send({ message: DELETED_HOLIDAY.message });
        else res.status(BAD_REQUEST.code).send({ message: BAD_REQUEST.message });
    }

    public async getAll(req: HttpRequest, res: HttpResponse, next?: NextFunction) {
        const { user_id } = res.locals;
        const holidays = await this.holidayUseCases.getByUserId(user_id);
        res.status(SUCCESSFULY_GET_HOLIDAYS.code).send(holidays);
    }

    public async getById(req: HttpRequest, res: HttpResponse, next?: NextFunction) {
        const { id } = req.params;
        const { user_id } = res.locals;
        if(!id || isNaN(id)) return res.status(INVALID_PARAM.code).send({ message: INVALID_PARAM.message });

        const holiday = await this.holidayUseCases.getById(Number(id), user_id);
        if(!holiday) return res.status(HOLIDAY_NOT_FOUND.code).send({ message: HOLIDAY_NOT_FOUND.message });

        if(next) {
            res.locals.holiday_id = holiday.id;
            return next();
        }

        res.status(StatusCodes.REQUEST_OK).send(holiday);
    }
}