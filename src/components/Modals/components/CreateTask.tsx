import {
    Box,
    Button,
    Flex,
    Input,
    Textarea,
    VStack
} from "@chakra-ui/react";
import { useTask } from "../../../hooks/useTask";
import { useForm, useFieldArray } from "react-hook-form";
import { useToast } from "../../../hooks/useToast";
import { ITask, Task } from "../../../interfaces/holiday";
import { ErrorLabel } from "../../ErrorLabel";

interface props {
    holiday_id: number,
    taskList: ITask[]
}

export function CreateTask({ taskList, holiday_id }: props) {
    const { create } = useTask(holiday_id);
    const { register, control, handleSubmit, formState: { errors }, setError } = useForm();
    const { genericToast } = useToast();
    const { fields, append, replace } = useFieldArray({
        control,
        name: 'tasks',
    });

    const clearFields = () => {
        replace([]);
    }

    const verificateRepeatedTitles = (tasks: any) => {
        const conflictList: number[] = [];
        tasks.forEach((current: Task, index: number) => {
            if (taskList.some((previous) => previous.title.toLowerCase().includes(current.title.toLowerCase()))) conflictList.push(index);
        });
        return conflictList;
    }

    const handleCreateTasks = async (data: any) => {
        const { tasks } = data;
        const conflictList = verificateRepeatedTitles(tasks);
        if (conflictList.length === 0) {
            try {
                await create(tasks);
                genericToast({
                    title: "Task successfuly created.",
                    description: "Your task was successfuly updated!",
                    status: "success"
                });
                clearFields();
            } catch (e: any) {
                console.log(e);
                if (e.response) {
                    const { data } = e.response;
                    genericToast({
                        title: "Error.",
                        description: data.message,
                        status: "error"
                    });
                }
            }
        } else for(let i in conflictList) setError(`tasks[${i}].title`,  { message: "This title is already in use for this holiday." });
    }

    return (
        <VStack w='100%' m='auto'>
            <Box w='100%'>
                {fields.map((field, index) => <Box key={field.id} w='100%' mb='10px'>
                    <Input 
                        {...register(`tasks[${index}].title`, { required: "A title is required." })} 
                        data-test={`create-task-title-input-${index}`} 
                    />
                    {errors.tasks && Array.isArray(errors.tasks) && errors.tasks[index].title && <ErrorLabel error={errors.tasks[index].title.message} />}
                    <Textarea 
                        {...register(`tasks[${index}].description`)} 
                        rows={3} 
                        cols={5} 
                        data-test={`create-task-description-input-${index}`} 
                    />
                </Box>)}
            </Box>
            <Flex mt='10px'>
                <Button data-test='add-task-fields' onClick={() => append({ title: "", description: "" })} variant="ghost">Add Task</Button>
                {fields.length > 0 && <>
                    <Button  colorScheme='red' onClick={clearFields}>Cancel</Button>
                    <Button data-test='button-create-holiday-tasks' onClick={handleSubmit(handleCreateTasks)} colorScheme="green" ml="5px">Create</Button>
                </>}
            </Flex>
        </VStack>
    );
}