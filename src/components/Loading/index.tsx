import { Flex } from "@chakra-ui/react";
import { ThreeDots } from "react-loader-spinner";

export function Loading() {
    return (
        <Flex w='100%' h='100%' justifyContent='center'>
            <ThreeDots color='lightgrey' />
        </Flex>
    );
} 