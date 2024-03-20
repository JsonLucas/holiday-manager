import { api } from "..";
import { TaskManipulation } from "../../interfaces/holiday";

export const createTask = async (holiday_id: number, body: TaskManipulation[]) => {
    const { data } = await api.post(`/holiday/${holiday_id}/task`, body);
    return data;
}

export const getTasks = async (holiday_id: number) => {
    const { data } = await api.get(`/holiday/${holiday_id}/task`);
    return data;
}

export const updateTask = async (id: number, holiday_id: number, body: TaskManipulation) => {
    const { data } = await api.put(`/holiday/${holiday_id}/task/${id}`, body);
    return data;
}

export const deleteTask = async (id: number, holiday_id: number) => {
    const { data } = await api.delete(`/holiday/${holiday_id}/task/${id}`);
    return data;
}

export const massDeleteTask = async (holiday_id: number, ids: number[]) => {
    const { data } = await api.post(`/holiday/${holiday_id}/task/delete`, ids);
    return data;
}