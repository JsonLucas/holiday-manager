export interface IHoliday{
    id: number,
    title: string,
    description: string | null,
    coordinates: string,
    date: Date,
    user_id: number
}

export type Holiday = Omit<IHoliday, 'id'>;

export interface IHolidayRepository {
    create: (body: Holiday[]) => Promise<boolean>
    update: (id: number, body: Holiday) => Promise<IHoliday>
    delete: (id: number) => Promise<boolean>
    massDelete: (ids: number[]) => Promise<boolean>
    getById: (id: number, user_id: number) => Promise<IHoliday | null>
    getByUserId: (user_id: number) => Promise<Array<IHoliday>>
    getByDate: (user_id: number, date: Date) => Promise<IHoliday | null>
}

export interface IHolidayUseCases {
    create: (body: Holiday[]) => Promise<boolean>
    update: (id: number, body: Holiday)=> Promise<IHoliday>
    delete: (id: number) => Promise<boolean>
    massDelete: (ids: number[]) => Promise<boolean>
    getById: (id: number, user_id: number) => Promise<IHoliday | null>
    getByUserId: (user_id: number)=> Promise<IHoliday[] | null>
}