import { useMutation, useQuery } from "@tanstack/react-query";
import { createHoliday, deleteHoliday, getHolidays, massDeleteHolidays, updateHoliday } from "../api/holiday";
import { Holiday } from "../interfaces/holiday";
import { queryClient } from "../main";

type UpdateHoliday = {
    id: number,
    holiday: Holiday
}

export const useHoliday = () => {
    const onSuccess = () => queryClient.invalidateQueries({ queryKey: ["holidays"], exact: true});
    const { data: holidays } = useQuery({
        queryKey: ['holidays'],
        queryFn: async () => await getHolidays()
    });

    const { mutateAsync: create } = useMutation({ 
        mutationFn: async (holidays: Holiday[]) => await createHoliday(holidays), 
        onSuccess
    });

    const { mutateAsync: update } = useMutation({ 
        mutationFn: async ({ id, holiday }: UpdateHoliday) => await updateHoliday(id, holiday), 
        onSuccess
    });

    const { mutateAsync: exclude } = useMutation({ 
        mutationFn: async (id: number) => await deleteHoliday(id), 
        onSuccess 
    });

    const { mutateAsync: massExclude } = useMutation({
        mutationFn: async (ids: number[]) => await massDeleteHolidays(ids), 
        onSuccess
    });

    return { holidays, create, update, exclude, massExclude };
}