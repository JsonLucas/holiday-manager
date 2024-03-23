import { Flex, VStack, Text } from "@chakra-ui/react";
import { Calendar } from '../../components/Calendar';
import { Holiday } from '../../components/Holiday';
import { useHoliday } from "../../hooks/useHoliday";
import { IHoliday } from "../../interfaces/holiday";
import { Loading } from "../../components/Loading";
import { SEOHelper } from "../../components/SEOHelper";
import { Header } from "../../components/Header";
import { useState } from "react";
import { IoIosTrash } from "react-icons/io";
import { useToast } from "../../hooks/useToast";

export function HomePage() {
    const [selectedHolidays, setSelectedHolidays] = useState<number[]>([]);
    const [massDeleteHidden, setMassDeleteHidden] = useState(true);
    const { holidays, massExclude } = useHoliday();
    const { genericToast } = useToast();

    const handleSelectHoliday = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value), auxList = selectedHolidays;
        const hasInList = auxList.some((item) => item === value);
        if (hasInList) {
            const index = auxList.indexOf(value);
            auxList.splice(index, 1);
        } else auxList.push(value);

        setMassDeleteHidden(auxList.length === 0);
        setSelectedHolidays(auxList);
    }

    const handleMassDelete = async () => {
        try {
            await massExclude(selectedHolidays);
            genericToast({
                title: "Deleted Holidays",
                description: "The selected holidays were successfuly deleted.",
                status: "success"
            });

            setMassDeleteHidden(true);
            setSelectedHolidays([]);
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

    return (
        <>
            <SEOHelper title="Home" content="Holiday Manager homepage." crawler={false} href={window.location.pathname} />
            <Header />
            <Flex w='100%' h='auto'>
                <VStack w='100%' m='100px auto'>
                    {!holidays && <Loading />}
                    {holidays && <>
                        <Calendar previousHolidays={holidays.map((item: IHoliday) => item.date)} />
                        <VStack mt='20px' w={['95%', '80%', '65%', '50%']} maxH={['35vh', '40vh', '40vh', '45vh']} overflowY='scroll'>
                            {holidays.length === 0 && <Text fontStyle='italic' fontSize='20px' textAlign='center'>Holiday list is empty. . .</Text>}
                            <Flex hidden={massDeleteHidden} mb='10px' h='10px' w='100%' justifyContent='flex-start'>
                                <IoIosTrash cursor='pointer' title='Delete Holiday' onClick={handleMassDelete} color='red' size={25} />
                            </Flex>
                            {holidays.map((item: IHoliday) =>
                                <Holiday
                                    key={`${item.user_id}-${item.id}`}
                                    handleSelectHoliday={handleSelectHoliday}
                                    id={item.id}
                                    coordinates={item.coordinates}
                                    title={item.title}
                                    description={item.description}
                                    date={item.date}
                                />
                            )}
                        </VStack>
                    </>}
                </VStack>
            </Flex >
        </>
    );
}