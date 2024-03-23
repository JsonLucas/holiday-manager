import { Flex, Text, HStack, Checkbox } from "@chakra-ui/react";
import { useState } from "react";
import { IoIosTrash, IoMdCreate } from 'react-icons/io';
import { ITask } from "../../../interfaces/holiday";
import { ModalTaskDetails } from "../../Modals/Task/ModalTaskDetails";
import { ModalDelete } from "../ModalDelete";

type props = ITask & { handleSelectTask: (event: React.ChangeEvent<HTMLInputElement>) => void, taskList: ITask[] };

export function Task({ title, description, id, holiday_id, handleSelectTask, taskList }: props) {
    const [isModalDetailsOpen, setIsModalDetailsOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isVisualization, setIsVisualization] = useState(false);

    const handleOpenVisualization = (isVisualization: boolean) => {
        setIsModalDetailsOpen(true); 
        setIsVisualization(isVisualization);
    }

    return (
        <Flex cursor='pointer' p='5px' w='100%' justifyContent="space-between">
            <Checkbox value={id} onChange={handleSelectTask} />
            <Text w='100%' textAlign='center' onClick={() => handleOpenVisualization(true)}>{title}</Text>
            <HStack spacing={1}>
                <IoMdCreate onClick={() => handleOpenVisualization(false)} color='grey' size={25} />
                <IoIosTrash onClick={() => setIsModalDeleteOpen(true)} color='red' size={25} />
            </HStack>
            <ModalTaskDetails 
                data={{ title, description, id, holiday_id }} 
                taskList={taskList}
                isOpen={isModalDetailsOpen} 
                onClose={() => setIsModalDetailsOpen(false)} 
                isVisualization={isVisualization}
            />
            <ModalDelete 
                isOpen={isModalDeleteOpen} 
                onClose={() => setIsModalDeleteOpen(false)} 
                id={holiday_id} 
                taskId={id}
                isHoliday={false}
            />
        </Flex>
    );
}