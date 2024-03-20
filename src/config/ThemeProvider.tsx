import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { themeConfig } from "./theme";
import { ReactNode } from "react";

const theme = extendTheme(themeConfig);
type props = { children: ReactNode | ReactNode[] };

export function ThemeProvider ({ children }: props) {
    return <ChakraProvider theme={theme}>
        {children}
    </ChakraProvider>
}