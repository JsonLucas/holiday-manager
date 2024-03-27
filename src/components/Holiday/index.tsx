import { Flex, Text, HStack, Checkbox } from "@chakra-ui/react";
import { useState } from "react";
import { IoIosTrash, IoMdCreate } from 'react-icons/io';
import { IHoliday } from "../../interfaces/holiday";
import { ModalHolidayDetails } from "../Modals/Holiday/ModalHolidayDetails";
import { ModalDelete } from "../Modals/ModalDelete";
import moment from 'moment';
import { useTask } from "../../hooks/useTask";

type props = Omit<IHoliday, 'user_id'> & { handleSelectHoliday: (event: React.ChangeEvent<HTMLInputElement>) => void }

export function Holiday({ title, description, coordinates, date, id, handleSelectHoliday }: props) {
    const { tasks } = useTask(id);
    const [isModalDetailsOpen, setIsModalDetailsOpen] = useState(false);
    const [isVisualization, setIsVisualization] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

    const handleOpenVisualization = (isVisualization: boolean) => {
        setIsModalDetailsOpen(true); 
        setIsVisualization(isVisualization);
    }

    return (
        <Flex data-test={`holiday-${moment(date).format('YYYY-MM-DD')}`} cursor='pointer' p='5px' w='100%' justifyContent="space-between">
            <Checkbox value={id} onChange={handleSelectHoliday} />
            <Text w='100%' textAlign='center' onClick={() => handleOpenVisualization(true)}>{moment(date).format("DD/MM/YYYY")}</Text>
            <HStack spacing={1}>
                <IoMdCreate data-test={`update-holiday-icon-${moment(date).format('YYYY-MM-DD')}`} title='Update Holiday' onClick={() => handleOpenVisualization(false)} color='grey' size={25} />
                <IoIosTrash data-test={`delete-holiday-icon-${moment(date).format('YYYY-MM-DD')}`} title='Delete Holiday' onClick={() => setIsModalDeleteOpen(true)} color='red' size={25} />
            </HStack>
            <ModalHolidayDetails 
                data={{ title, description, coordinates, date, id, tasks: tasks || [] }}
                isOpen={isModalDetailsOpen} 
                onClose={() => setIsModalDetailsOpen(false)} 
                isVisualization={isVisualization}
            />
            <ModalDelete 
                isHoliday={true} 
                isOpen={isModalDeleteOpen} 
                onClose={() => setIsModalDeleteOpen(false)} 
                id={id} 
            />
        </Flex>
    );
}