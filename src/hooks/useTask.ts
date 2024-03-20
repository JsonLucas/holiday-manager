import { useMutation, useQuery } from "@tanstack/react-query";
import { TaskManipulation } from "../interfaces/holiday";
import { queryClient } from "../main";
import { createTask, deleteTask, getTasks, massDeleteTask, updateTask } from "../api/task";

type UpdateTask = { 
    id: number, 
    task: TaskManipulation 
}

export const useTask = (holiday_id: number) => {
    const onSuccess = () => queryClient.invalidateQueries({ queryKey: ["tasks"], exact: true});
    const { data: tasks, refetch: refetchTasks } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => await getTasks(holiday_id)
    });

    const { mutateAsync: create } = useMutation({ 
        mutationFn: async (tasks: TaskManipulation[]) => await createTask(holiday_id, tasks), 
        onSuccess 
    });

    const { mutateAsync: update } = useMutation({ 
        mutationFn: async ({ id, task }: UpdateTask) => await updateTask(id, holiday_id, task), 
        onSuccess 
    });

    const { mutateAsync: exclude } = useMutation({ 
        mutationFn: async (id: number) => await deleteTask(id, holiday_id), 
        onSuccess 
    });

    const { mutateAsync: massExclude } = useMutation({
        mutationFn: async (ids: number[]) => await massDeleteTask(holiday_id, ids), 
        onSuccess 
    });

    return { tasks, refetchTasks, create, update, exclude, massExclude };
}