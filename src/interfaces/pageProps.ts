import { Holiday, ITask } from "./holiday";

export interface HolidayFields {
    title: string,
    description: string | undefined,
    coordinates: string
}

export interface ModalCreateHolidayPops {
    isOpen: boolean,
    onClose: () => void
    dates: Date[],
}

export type ModalUpdateHolidayProps = Omit<ModalCreateHolidayPops, "dates"> & { data: Holiday & { id: number }, isVisualization?: boolean };
export type ModalUpdateTaskProps = Omit<ModalCreateHolidayPops, "dates"> & { data: ITask, isVisualization?: boolean };
export type ModalDeleteHolidayProps = Omit<ModalCreateHolidayPops, "dates"> & { id: number, isHoliday: boolean, taskId?: number };

export type Coordinates = {
    lat: number,
    lng: number
}