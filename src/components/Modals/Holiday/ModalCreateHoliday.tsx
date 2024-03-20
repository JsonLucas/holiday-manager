import {
    Button,
    Input,
    Textarea,
    Text,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    VStack,
    Box,
    ModalFooter,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel
} from "@chakra-ui/react";
import { useEffect } from 'react';
import { useHoliday } from "../../../hooks/useHoliday";
import { ModalCreateHolidayPops } from "../../../interfaces/pageProps";
import { useFieldArray, useForm } from "react-hook-form";
import { Map } from "@vis.gl/react-google-maps";
import { useToast } from "../../../hooks/useToast";
import moment from 'moment';

export function ModalCreateHoliday({ isOpen, onClose, dates }: ModalCreateHolidayPops) {
    const { create } = useHoliday();
    const { register, control, handleSubmit, formState: { errors }, setValue } = useForm();
    const { genericToast } = useToast();
    const { fields, append, replace } = useFieldArray({
        control,
        name: 'holidays',
    });

    const handleCreateHolidays = async ({ holidays }: any) => {
        try {
            await create(holidays);
            genericToast({
                title: "Holiday successfuly created.",
                description: "Your holiday plan was successfuly created!",
                status: "success"
            });
            onClose();
        } catch (e: any) {
            console.log(e);
            genericToast({
                title: "Invalid data.",
                description: "You must to fill all the fields with valid data.",
                status: "error"
            });
        }
    }

    useEffect(() => {
        if(fields.length > 0) replace([]);
        if (isOpen) {
            dates.forEach((item) => {
                append({
                    date: item,
                    title: '',
                    description: undefined,
                    coordinates: ''
                });
            });
        }
    }, [isOpen]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} size='xl' scrollBehavior="inside" motionPreset='slideInTop' isCentered>
            <ModalOverlay
                bg='none'
                backdropFilter='auto'
                backdropInvert='80%'
                backdropBlur='2px'
            />
            <ModalContent style={{ maxHeight: "80%" }}>
                <ModalHeader>Create Holiday</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Accordion defaultIndex={[0]} allowMultiple>
                        {fields.map((item, index) =>
                            <AccordionItem key={item.id}>
                                <AccordionButton textAlign='center'>
                                    {moment(dates[index]).format('DD/MM/YYYY')}
                                </AccordionButton>
                                <AccordionPanel pb={4}>
                                    <VStack>
                                        <Input {...register(`holidays[${index}].title`, { required: "A title is required." })} />
                                        {errors.holidays && Array.isArray(errors.holidays) && errors.holidays[index].title && <Text color='darkred' fontSize='15px' textAlign='left' w='100%'>{errors.holidays[index].title.message}</Text>}
                                        <Textarea {...register(`holidays[${index}].description`)} rows={3} cols={5} />
                                        <Box w="100%" h="300px">
                                            <Map
                                                mapId="c15d65ecf808cfe0"
                                                center={{ lat: 53.54, lng: 10 }}
                                                zoom={10}
                                                onClick={(event) => setValue(`holidays[${index}].coordinates`, `${event.detail.latLng?.lat}, ${event.detail.latLng?.lng}`)}
                                            >
                                                <></>
                                            </Map>
                                        </Box>
                                        <Input {...register(`holidays[${index}].coordinates`, { required: "You must to select a location." })} type='hidden' />
                                        {errors.holidays && Array.isArray(errors.holidays) && errors.holidays[index].coordinates && <Text color="darkred" fontSize='15px' textAlign='left' w='100%'>{errors.holidays[index].coordinates.message}</Text>}
                                    </VStack>
                                </AccordionPanel>
                            </AccordionItem>
                        )
                        }
                    </Accordion>
                </ModalBody >
                <ModalFooter>
                    <Button colorScheme="green" onClick={handleSubmit(handleCreateHolidays)}>Create</Button>
                </ModalFooter>
            </ModalContent >
        </Modal >
    );
}