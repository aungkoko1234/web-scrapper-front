import "../styles/globals.scss";
import { SWRConfig } from "swr";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import theme from "../theme";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>BAP News</title>
        <meta name="description" content="BAP News" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SWRConfig value={{ onError: (error: Error) => console.log(error) }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* <Layout> */}
          <Component {...pageProps} />
          {/* </Layout> */}
        </ThemeProvider>
      </SWRConfig>
    </>
  );
}
