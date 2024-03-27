import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Textarea,
    VStack,
    ModalFooter
} from "@chakra-ui/react";
import { ModalUpdateTaskProps } from "../../../interfaces/pageProps";
import { useTask } from "../../../hooks/useTask";
import { useForm } from "react-hook-form";
import { useToast } from "../../../hooks/useToast";
import { ErrorLabel } from "../../ErrorLabel";

export function ModalTaskDetails({ isOpen, onClose, data, isVisualization = true, taskList }: ModalUpdateTaskProps) {
    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        defaultValues: {
            title: data.title,
            description: data.description
        }
    });
    const { update } = useTask(data.holiday_id);
    const { genericToast } = useToast();

    const handleUpdateTask = async (task: any) => {
        if (!taskList.some((item) => item.title.toLowerCase().includes(task.title.toLowerCase()))) {
            try {
                await update({ id: data.id, task });
                genericToast({
                    title: "Task successfuly updated.",
                    description: "Your task was successfuly updated!",
                    status: "success"
                });
                onClose();
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
        } else setError('title', { message: "This title is already taken." });
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size='xl' motionPreset='slideInTop' isCentered>
            <ModalOverlay />
            <ModalContent style={{ maxHeight: "80%" }}>
                <ModalHeader>Task</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack>
                        <Input data-test='update-task-title-input' {...register("title", { required: "A title is required." })} disabled={isVisualization} />
                        {errors.title && <ErrorLabel error={errors.title.message ?? ""} />}
                        <Textarea data-test='update-task-description-input' {...register("description")} disabled={isVisualization} rows={3} cols={5} />
                    </VStack>
                </ModalBody>
                {!isVisualization &&
                    <ModalFooter>
                        <Button data-test="button-update-task" colorScheme="green" onClick={handleSubmit(handleUpdateTask)}>Update</Button>
                    </ModalFooter>
                }
            </ModalContent>
        </Modal>
    );
}