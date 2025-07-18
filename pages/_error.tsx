import type { NextPageContext } from "next";
import Head from "next/head";

import MainLayout from "@/internals/MainLayout";
import { Fullbox } from "@/components/Fullbox";
import styles from "@/styles/ErrorPages.module.css";

interface ErrorProps {
  statusCode?: number;
}

// biome-ignore lint/suspicious/noShadowRestrictedNames: thats how nextjs wants it
function Error({ statusCode }: ErrorProps) {
  return (
    <MainLayout noPadding>
      <Head>
        <title>Error • the lounge hub</title>
      </Head>

      <Fullbox useDims={true}>
        <h1 className={styles.heading}>{statusCode ?? "oops"}</h1>
        <p>
          {statusCode
            ? "Sorry, an unexpected error occurred on the server."
            : "Sorry, an unexpected error occurred."}
        </p>
      </Fullbox>
    </MainLayout>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext): ErrorProps => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode: statusCode || 500 }; // Ensure statusCode is always a number
};

export default Error;
