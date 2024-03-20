import { api } from "..";
import { Holiday } from "../../interfaces/holiday";

export const createHoliday = async (holidays: Holiday[]) => {
    const { data } = await api.post('/holiday', holidays);
    return data;
}

export const getHolidays = async () => {
    const { data } = await api.get('/holiday');
    return data;
}

export const updateHoliday = async (id: number, body: Holiday) => {
    const { data } = await api.put(`/holiday/${id}`, body);
    return data;
}

export const deleteHoliday = async (id: number) => {
    const { data } = await api.delete(`/holiday/${id}`);
    return data;
}

export const massDeleteHolidays = async (ids: number[]) => {
    const { data } = await api.post(`/holiday/delete`, ids);
    return data;
}