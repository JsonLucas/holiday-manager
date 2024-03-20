import { Button, Flex, useColorMode, Box } from "@chakra-ui/react";
import { IoIosLogOut } from "react-icons/io";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosMoon, IoIosSunny } from "react-icons/io";
import { useToast } from "../../hooks/useToast";

export function Header() {
    const { get, remove } = useLocalStorage();
    const [isLogged, setIsLogged] = useState(false);
    const { toggleColorMode, colorMode } = useColorMode();
    const { genericToast } = useToast();
    const navigate = useNavigate();

    const handleLogout = () => {
        remove('accessToken');
        genericToast({
            title: "Logging out. . .",
            description: "Thanks for using the HolidayManager!",
            status: "success"
        });
        setIsLogged(false);
    }

    useEffect(() => {
        if (get("accessToken")) {
            setIsLogged(true);
            navigate('/home');
        } else {
            if(window.location.href.includes('/home')) navigate('/');
        }
    }, [isLogged]);

    return (
        <Flex
            position='fixed'
            top='0'
            w='100%'
            h='75px'
            alignItems='center'
            justifyContent='space-between'
        >
            <Box ml='20px' onClick={toggleColorMode} cursor='pointer'>
                {colorMode === "dark" 
                    ? <IoIosSunny title="Toggle to dark theme" color='orange' size={25} /> 
                    : <IoIosMoon title="Toggle to light theme" color='black' size={25} />
                }
            </Box>
            {isLogged &&
                <Button onClick={handleLogout} mr='20px' variant='ghost' title="Logout">
                    <IoIosLogOut size={25} />
                </Button>
            }
        </Flex>
    );
}