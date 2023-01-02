import "../styles/globals.scss";
import { SWRConfig } from "swr";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "../theme";
import type { AppProps } from "next/app";
import { wrapper } from "../store/store";
import Head from "next/head";
import { Provider } from "react-redux";

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <>
      <Head>
        <title>Google Search Wrapper</title>
        <meta name="description" content="BAP News" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SWRConfig value={{ onError: (error: Error) => console.log(error) }}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* <Layout> */}
            <Component {...pageProps} />
            {/* </Layout> */}
          </ThemeProvider>
        </Provider>
      </SWRConfig>
    </>
  );
}
