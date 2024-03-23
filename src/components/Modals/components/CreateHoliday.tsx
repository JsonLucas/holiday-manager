import { UseFormRegister, FieldValues, FieldErrors, UseFormSetValue } from "react-hook-form";
import { Box, Input, Textarea, VStack } from '@chakra-ui/react';
import { HolidayFields } from '../../../interfaces/pageProps';
import { Map } from "@vis.gl/react-google-maps";
import { ErrorLabel } from "../../ErrorLabel";

interface props {
    index: number,
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors<FieldValues>,
    setValue: UseFormSetValue<FieldValues>,
    isVisualization?: boolean,
    values?: HolidayFields
}

export function CreateHoliday({ register, errors, setValue, index, isVisualization = false }: props) {
    return (
        <VStack>
            <Input {...register(`holidays[${index}].title`, { required: "A title is required.", disabled: isVisualization })} />
            {errors.holidays && Array.isArray(errors.holidays) && errors.holidays[index].title && <ErrorLabel error={errors.holidays[index].title.message} />}
            <Textarea {...register(`holidays[${index}].description`, { disabled: isVisualization })} rows={3} cols={5} />
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
            <Input {...register(`holidays[${index}].coordinates`, { required: "You must to select a location.", disabled: isVisualization })} type='hidden' />
            {errors.holidays && Array.isArray(errors.holidays) && errors.holidays[index].coordinates && <ErrorLabel error={errors.holidays[index].coordinates.message} />}
        </VStack>
    );
}