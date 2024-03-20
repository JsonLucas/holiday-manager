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
    ModalFooter,
    Text
} from "@chakra-ui/react";
import { ModalUpdateTaskProps } from "../../../interfaces/pageProps";
import { useTask } from "../../../hooks/useTask";
import { useForm } from "react-hook-form";
import { useToast } from "../../../hooks/useToast";

export function ModalTaskDetails({ isOpen, onClose, data, isVisualization = true }: ModalUpdateTaskProps) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            title: data.title,
            description: data.description
        }
    });
    const { update } = useTask(data.holiday_id);
    const { genericToast } = useToast();

    const handleUpdateTask = async (task: any) => {
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
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size='xl' motionPreset='slideInTop' isCentered>
            <ModalOverlay />
            <ModalContent style={{ maxHeight: "80%" }}>
                <ModalHeader>Task</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack>
                        <Input {...register("title", { required: "A title is required." })} disabled={isVisualization} />
                        {errors.title && <Text color='darkred' fontSize='15px' textAlign='left' w='100%'>{errors.title.message}</Text>}
                        <Textarea {...register("description")} disabled={isVisualization} rows={3} cols={5} />
                    </VStack>
                </ModalBody>
                {!isVisualization &&
                    <ModalFooter>
                        <Button colorScheme="green" onClick={handleSubmit(handleUpdateTask)}>Update</Button>
                    </ModalFooter>
                }
            </ModalContent>
        </Modal>
    );
}