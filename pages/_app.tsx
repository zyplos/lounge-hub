import { SWRConfig } from "swr";

import { MinecraftDataProvider } from "../internals/MinecraftContext";
import fetcher from "../internals/fetcher";

import "normalize.css";
import "../styles/_globals.scss"; // Import common styles
import "./app.css";
import { AppProps } from "next/app";
require("@south-paw/typeface-minecraft");

function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher }}>
      <MinecraftDataProvider>
        <Component {...pageProps} />
      </MinecraftDataProvider>
    </SWRConfig>
  );
}

export default App;
