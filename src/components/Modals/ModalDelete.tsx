import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    ModalFooter,
    Text
} from "@chakra-ui/react";
import { useHoliday } from "../../hooks/useHoliday";
import { ModalDeleteHolidayProps } from "../../interfaces/pageProps";
import { useTask } from "../../hooks/useTask";
import { useToast } from "../../hooks/useToast";

export function ModalDelete({ isOpen, onClose, id, isHoliday, taskId }: ModalDeleteHolidayProps) {
    const { exclude: deleteHoliday } = useHoliday();
    const { exclude: deleteTask } = useTask(id);
    const { genericToast } = useToast();

    const handleDeleteHoliday = async () => {
        try {
            await deleteHoliday(id);
            genericToast({
                title: "Holiday successfuly deleted.",
                description: "Your holiday plan was successfuly deleted!",
                status: "success"
            });
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

    const handleDeleteTask = async () => {
        try {
            if(taskId){
                await deleteTask(taskId);
                genericToast({
                    title: "Task successfuly deleted.",
                    description: "Your task was successfuly deleted from this holiday!",
                    status: "success"
                });
                onClose();
            }
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
        <Modal isOpen={isOpen} onClose={onClose} size='lg' isCentered>
            <ModalOverlay />
            <ModalContent style={{ maxHeight: "80%" }}>
                <ModalHeader>Are you sure?</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>Do you want to proceed with this action?</Text>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="red" onClick={isHoliday ? handleDeleteHoliday : handleDeleteTask}>Delete</Button>&nbsp;
                    <Button colorScheme="blue" variant="outline" onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}