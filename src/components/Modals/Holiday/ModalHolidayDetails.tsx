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
    Box,
    ModalFooter,
    Text,
    Flex
} from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import { Map } from "@vis.gl/react-google-maps";
import { useHoliday } from "../../../hooks/useHoliday";
import { Coordinates, ModalUpdateHolidayProps } from "../../../interfaces/pageProps";
import { Task } from "../components/Task";
import { useTask } from "../../../hooks/useTask";
import { ITask } from "../../../interfaces/holiday";
import { CreateTask } from "../components/CreateTask";
import { useForm } from "react-hook-form";
import { IoIosTrash } from "react-icons/io";
import { useToast } from "../../../hooks/useToast";
import moment from 'moment';
import { ErrorLabel } from "../../ErrorLabel";

export function ModalHolidayDetails({ isOpen, onClose, data, isVisualization = true }: ModalUpdateHolidayProps) {
    const { massExclude } = useTask(data.id);
    const { update } = useHoliday();
    const [coordinates, setCoordinates] = useState<Coordinates>();
    const [massDeleteHidden, setMassDeleteHidden] = useState(true);
    const [taskIdList, setTaskIdList] = useState<number[]>([]);
    const { genericToast } = useToast();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {
            date: data.date,
            coordinates: data.coordinates,
            title: data.title,
            description: data.description
        }
    });

    const formatCoordinates = (coordinates: string) => {
        const splitCoordinates = coordinates.split(', ');
        return { lat: Number(splitCoordinates[0]), lng: Number(splitCoordinates[1]) };
    }

    const handleUpdateHoliday = async (holiday: any) => {
        try {
            await update({ id: data.id, holiday });
            genericToast({
                title: "Holiday successfuly updated.",
                description: "Your holiday plan was successfuly updated!",
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

    const handleSelectTask = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value), auxList = taskIdList;
        const hasInList = taskIdList.some((item) => item === Number(value));
        if (hasInList) {
            const index = taskIdList.indexOf(value);
            auxList.splice(index, 1);
        } else auxList.push(value);

        setMassDeleteHidden(auxList.length === 0);
        setTaskIdList(auxList);
    }

    const handleMassDelete = async () => {
        try {
            await massExclude(taskIdList);
            genericToast({
                title: "Deleted Holidays",
                description: "The selected holidays were successfuly deleted.",
                status: "success"
            });
            setMassDeleteHidden(true);
            setTaskIdList([]);
        } catch (e: any) {
            console.log(e);
            const message = e?.response?.data?.message ?? e.message;
            genericToast({
                title: "",
                description: message,
                status: "error"
            });
        }
    }

    useEffect(() => {
        setCoordinates(formatCoordinates(data.coordinates));
    }, [isOpen]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} size='xl' scrollBehavior="inside" motionPreset='slideInTop' isCentered>
            <ModalOverlay />
            <ModalContent style={{ maxHeight: "80%" }}>
                <ModalHeader>{moment(data.date).format("DD/MM/YYYY")}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack>
                        <Input 
                            {...register("title", { required: "A title is required." })} 
                            disabled={isVisualization} 
                            data-test={`update-holiday-title-input`}
                        />
                        {errors.title && <ErrorLabel error={errors.title.message ?? ""} />}
                        <Textarea 
                            {...register("description")} 
                            disabled={isVisualization} 
                            data-test={"update-holiday-description-input"}
                            rows={3} 
                            cols={5} 
                        />
                        <Box w="100%" h="300px">
                            <Map
                                mapId="c15d65ecf808cfe0"
                                defaultCenter={coordinates}
                                defaultZoom={10}
                                id={"update-holiday-coordinates-input"}
                                onClick={(event) => setValue(`coordinates`, `${event.detail.latLng?.lat}, ${event.detail.latLng?.lng}`)}
                            >
                                <></>
                            </Map>
                        </Box>
                        <Input {...register('coordinates', { required: "You must to select a location." })} type='hidden' />
                        {errors.coordinates && <ErrorLabel error={errors.coordinates?.message ?? ""} />}
                        {!data.tasks || (data.tasks && data.tasks.length === 0) && <Text textAlign='center' fontStyle='italic' fontSize='19px'>Task list is empty.</Text>}
                        {data.tasks && data.tasks.length > 0 && <VStack w='100%' mt="20px" mb='20px'>
                            <Text textAlign='center' fontWeight='bold' fontSize='22px' mb='20px'>Tasks</Text>
                            <Flex hidden={massDeleteHidden} mb='10px' h='10px' w='100%' justifyContent='flex-start'>
                                <IoIosTrash cursor='pointer' title='Delete Holiday' onClick={handleMassDelete} color='red' size={25} />
                            </Flex>
                            {data.tasks.map((item: ITask, index: number) => <Task index={index} key={`${item.holiday_id}-${item.id}`} {...item} handleSelectTask={handleSelectTask} taskList={data.tasks} />)}
                        </VStack>}
                        <CreateTask taskList={data.tasks} holiday_id={data.id} />
                    </VStack>
                </ModalBody>
                {!isVisualization &&
                    <ModalFooter>
                        <Button data-test='button-update-holiday' colorScheme="green" onClick={handleSubmit(handleUpdateHoliday)}>Update</Button>
                    </ModalFooter>
                }
            </ModalContent>
        </Modal>
    );
}