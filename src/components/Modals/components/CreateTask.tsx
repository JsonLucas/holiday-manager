import {
    Box,
    Button,
    Flex,
    Input,
    Textarea,
    VStack,
    Text
} from "@chakra-ui/react";
import { useTask } from "../../../hooks/useTask";
import { useForm, useFieldArray } from "react-hook-form";
import { useToast } from "../../../hooks/useToast";

interface props {
    holiday_id: number
}

export function CreateTask({ holiday_id }: props) {
    const { create } = useTask(holiday_id);
    const { register, control, handleSubmit, formState: { errors } } = useForm();
    const { genericToast } = useToast();
    const { fields, append, replace } = useFieldArray({
        control,
        name: 'tasks',
    });

    const clearFields = () => {
        replace([]);
    }

    const handleCreateTasks = async (data: any) => {
        try {
            const { tasks } = data;
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
    }

    return (
        <VStack w='100%' m='auto'>
            <Box w='100%'>
                {fields.map((field, index) => <Box key={field.id} w='100%' mb='10px'>
                    <Input {...register(`tasks[${index}].title`, { required: "A title is required." })} />
                    {errors.tasks && Array.isArray(errors.tasks) && errors.tasks[index].title && <Text color='darkred' fontSize='15px' textAlign='left' w='100%'>{errors.tasks[index].title.message}</Text>}
                    <Textarea {...register(`tasks[${index}].description`)} rows={3} cols={5} />
                </Box>)}
            </Box>
            <Flex mt='10px'>
                <Button onClick={() => append({ title: "", description: "" })} variant="ghost">Add Task</Button>
                {fields.length > 0 && <>
                    <Button colorScheme='red' onClick={clearFields}>Cancel</Button>
                    <Button onClick={handleSubmit(handleCreateTasks)} colorScheme="green" ml="5px">Create</Button>
                </>}
            </Flex>
        </VStack>
    );
}