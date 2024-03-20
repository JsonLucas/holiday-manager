import { Holiday, IHoliday, IHolidayRepository, IHolidayUseCases } from "../interfaces/Holiday";

export class HolidayUseCases implements IHolidayUseCases {
    constructor(private readonly holidayRepository: IHolidayRepository){ }
    public async create(body: Holiday[]): Promise<boolean> {
        const holidayExists = await this.holidayRepository.getByUserId(body[0].user_id);
        if(!holidayExists) return false;

        let holidays: Holiday[] = [];
        body.forEach((item) => {
            if(!holidayExists.some(holiday => holiday.date === item.date)) holidays.push(item);
        });

        return await this.holidayRepository.create(holidays);
    }

    public async update(id: number, body: Holiday): Promise<IHoliday> {
        return await this.holidayRepository.update(id, body);
    }

    public async delete(id: number): Promise<boolean> {
        return await this.holidayRepository.delete(id);
    }

    public async massDelete(ids: number[]): Promise<boolean> {
        return await this.holidayRepository.massDelete(ids);
    }

    public async getById(id: number, user_id: number): Promise<IHoliday | null> {
        return await this.holidayRepository.getById(id, user_id);
    }

    public async getByUserId(user_id: number): Promise<IHoliday[] | null> {
        return await this.holidayRepository.getByUserId(user_id);
    }

    public async getByDate(user_id: number, date: Date): Promise<IHoliday | null> {
        return await this.holidayRepository.getByDate(user_id, date);
    }
}