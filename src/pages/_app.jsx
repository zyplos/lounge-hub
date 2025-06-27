import { SWRConfig } from "swr";
import { SessionProvider } from "next-auth/react";

import { MinecraftDataProvider } from "../internals/MinecraftContext";
import fetcher from "../internals/fetcher";

import "normalize.css";
import "../styles/_common.css"; // Import common styles
import "./app.css";
// import { AppProps } from "next/app";
require("@south-paw/typeface-minecraft");

function App({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher }}>
      <MinecraftDataProvider>
        <SessionProvider refetchInterval={0} session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </MinecraftDataProvider>
    </SWRConfig>
  );
}

export default App;
