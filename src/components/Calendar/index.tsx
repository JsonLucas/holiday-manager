import { useState } from 'react';
import { Flex, VStack, Text, Input } from '@chakra-ui/react';
import { ModalCreateHoliday } from '../Modals/Holiday/ModalCreateHoliday';
import moment from 'moment';

type Range = {
    startDate: Date,
    endDate: Date | undefined
}

export function Calendar() {
    const [dates, setDates] = useState<Date[]>([]);
    const [rangeDates, setRangeDates] = useState<Range>({ startDate: new Date(), endDate: undefined });
    const [isMultiple, setIsMultiple] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleDateChange = (value: string, field: 'startDate' | 'endDate') => {
        const range = rangeDates;
        range[field] = moment(value).toDate();
        setRangeDates(range);
        setDates([]);
        fillArrayDates();
    }

    const openModalCreateHoliday = (dates: Date[]) => {
        setDates(dates);
        setIsOpen(true);
    }

    const closeModalCreateHoliday = () => {
        setIsOpen(false); 
        setDates([]);
    }

    const fillArrayDates = () => {
        if (isMultiple) {
            if (rangeDates.startDate && rangeDates.endDate) {
                let currentDate = moment(rangeDates.startDate);
                const dates: Date[] = [];
                do {
                    dates.push(currentDate.toDate());
                    currentDate.add(1, 'days');
                } while (currentDate.isSameOrBefore(moment(rangeDates.endDate)));
                return openModalCreateHoliday(dates);
            }
            return;
        } 
        openModalCreateHoliday([moment(rangeDates.startDate).toDate()]);
    }

    return (
        <>
            <Flex w={['95%', '80%', '65%', '50%']} alignItems='center' justifyContent='center'>
                <VStack w='100%' alignItems='center' justifyContent='center' m='auto'>
                    <Flex>
                        <Text mr='10px' mt='7px'>Start Date:</Text> 
                        <Input 
                            w='auto' 
                            type="date" 
                            min={new Date().toISOString().split('T')[0]} 
                            max={rangeDates.endDate ? moment(rangeDates.endDate).toDate().toISOString().split("T")[0] : undefined}
                            onChange={({ target }) => handleDateChange(target.value, 'startDate')} 
                        />
                    </Flex>
                    <Flex>
                        <Text mr='16px' mt='7px'>End Date:</Text> 
                        <Input 
                            w='auto' 
                            type="date" 
                            min={moment(rangeDates.startDate).add(1, 'days').toDate().toISOString().split("T")[0]} 
                            onChange={({ target }) => handleDateChange(target.value, 'endDate')} 
                            disabled={!isMultiple} 
                        />
                    </Flex>
                    <Flex alignItems='center' justifyContent='space-between'>
                        <Text mb='12px' mr='10px'>Is date range?</Text>
                        <label className="toggle">
                            <input type="checkbox" checked={isMultiple} onChange={() => setIsMultiple(!isMultiple)} />
                            <span className="slider"></span>
                        </label>
                    </Flex>
                </VStack>
            </Flex>
            <ModalCreateHoliday dates={dates} isOpen={isOpen} onClose={closeModalCreateHoliday} />
        </>
    );
}