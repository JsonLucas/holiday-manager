import { useState } from 'react';
import { Flex, VStack, Text, Input, Button } from '@chakra-ui/react';
import { ModalCreateHoliday } from '../Modals/Holiday/ModalCreateHoliday';
import { useToast } from '../../hooks/useToast';
import moment from 'moment';

type props = { previousHolidays: Date[] };

type Range = {
    startDate: Date | undefined,
    endDate: Date | undefined
}

export function Calendar({ previousHolidays }: props) {
    const [dates, setDates] = useState<Date[]>([]);
    const [rangeDates, setRangeDates] = useState<Range>({ startDate: undefined, endDate: undefined });
    const [isMultiple, setIsMultiple] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { genericToast } = useToast();
    const handleDateChange = (value: string, field: 'startDate' | 'endDate') => {
        const range = rangeDates;
        range[field] = moment(value).toDate();
        setRangeDates(range);
        setDates([]);
    }

    const openModalCreateHoliday = (dates: Date[]) => {
        setDates(dates);
        setIsOpen(true);
    }

    const closeModalCreateHoliday = () => {
        setIsOpen(false); 
        setDates([]);
    }
    
    const verificateIfContainsOnPreviousHolidays = (dates: Date[]) => {
        const auxDates = dates.map((item) => moment(item).toDate());
        previousHolidays.forEach((previous) => {
            auxDates.forEach((current, index) => {
                if(moment(previous).isSame(current)) auxDates.splice(index, 1);
            });
        });
        return auxDates;
    }

    const fillArrayDates = () => {
        const dates: Date[] = [];
        if (isMultiple) {
            if (rangeDates.startDate && rangeDates.endDate) {
                let currentDate = moment(rangeDates.startDate);
                do {
                    dates.push(currentDate.toDate());
                    currentDate.add(1, 'days');
                } while (currentDate.isSameOrBefore(moment(rangeDates.endDate)));
            }
        } else dates.push(moment(rangeDates.startDate).toDate());

        const finalDates = verificateIfContainsOnPreviousHolidays(dates);
        if(dates.length !== finalDates.length) genericToast({ title: 'Date conflict', description: 'Some dates already have a holiday plan.', status: 'warning' });
        
        return finalDates.length > 0 && openModalCreateHoliday(finalDates);
    }

    return (
        <>
            <Flex w={['95%', '80%', '65%', '50%']} alignItems='center' justifyContent='center'>
                <VStack w='100%' alignItems='center' justifyContent='center' m='auto'>
                    <Flex>
                        <Text mr='10px' mt='7px'>Start Date:</Text> 
                        <Input 
                            data-test="start-range-date"
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
                            data-test="end-range-date"
                            w='auto' 
                            type="date" 
                            min={moment(rangeDates.startDate).add(1, 'days').toDate().toISOString().split("T")[0]} 
                            onChange={({ target }) => handleDateChange(target.value, 'endDate')} 
                            disabled={!isMultiple} 
                        />
                    </Flex>
                    <Flex alignItems='center' justifyContent='space-between'>
                        <Text mb='12px' mr='10px'>Is date range?</Text>
                        <label className="toggle" data-test="toggle-range-date">
                            <input type="checkbox" checked={isMultiple} onChange={() => setIsMultiple(!isMultiple)} />
                            <span className="slider"></span>
                        </label>
                    </Flex>
                    <Button 
                        data-test='button-open-modal-create-holiday' 
                        colorScheme='green' 
                        onClick={fillArrayDates}
                        hidden={isMultiple ? (rangeDates.startDate && rangeDates.endDate) === undefined : rangeDates.startDate === undefined}
                    >
                        Create Holiday
                    </Button>
                </VStack>
            </Flex>
            <ModalCreateHoliday dates={dates} isOpen={isOpen} onClose={closeModalCreateHoliday} />
        </>
    );
}