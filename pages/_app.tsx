import { SWRConfig } from "swr";
import type { AppProps } from "next/app";

import { MinecraftDataProvider } from "@/internals/MinecraftContext";
import fetcher from "@/internals/fetcher";

import "@/styles/_variables.scss";
import "@/styles/_globals.scss";
require("@south-paw/typeface-minecraft");

function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher,
        // DONT use onErrorRetry
        // https://github.com/vercel/swr/discussions/1574
        // https://github.com/vercel/swr/releases/tag/1.2.1
        shouldRetryOnError: (error) => {
          // We skip retrying if the API is returning 404:
          if (error.status >= 400 && error.status < 500) {
            return false;
          }

          return true;
        },
        // a lot of data on here isn't particularly dynamic
        // disable revalidateOnFocus so we don't send unnecessary http requests
        revalidateOnFocus: false,
      }}
    >
      <MinecraftDataProvider>
        <Component {...pageProps} />
      </MinecraftDataProvider>
    </SWRConfig>
  );
}

export default App;
