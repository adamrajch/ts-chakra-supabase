import type { AppProps } from "next/app";
import Head from "next/head";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { Chakra } from "../../styles/chakra";
import "../../styles/global.css";
import store from "../app/store";
function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Crypto</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <Chakra cookies={pageProps.cookies}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Chakra>
    </React.Fragment>
  );
}

export default MyApp;
