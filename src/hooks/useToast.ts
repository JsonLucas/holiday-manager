import { useToast as ChakraUseToast } from "@chakra-ui/react";

type GenericToast = { 
    title: string, 
    description: string, 
    status: 'success' | 'error' 
}

export const useToast = () => {
    const toast = ChakraUseToast();
    const genericToast = (options: GenericToast) => toast({
        ...options, 
        duration: 3000, 
        isClosable: true
    });

    return { genericToast };
}