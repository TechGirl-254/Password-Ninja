import {
  CSSReset,
  ChakraProvider,
  ColorModeProvider,
  ThemeProvider,
  theme,
} from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import ThemeToggler from "@/components/ThemeToggler";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
          <ColorModeProvider>
            <CSSReset />
            <ThemeToggler />
          </ColorModeProvider>
        </ThemeProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
