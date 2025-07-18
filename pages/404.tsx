import Head from "next/head";
import MainLayout from "@/internals/MainLayout";
import { Fullbox } from "@/components/Fullbox";
import styles from "@/styles/ErrorPages.module.css";

export default function Custom404() {
  return (
    <MainLayout noPadding>
      <Head>
        <title>404 not found • the lounge hub</title>
      </Head>

      <Fullbox useDims={true}>
        <h1 className={styles.heading}>404</h1>
        <p>Whatever you tried to access doesn't exist. Sorry!</p>
      </Fullbox>
    </MainLayout>
  );
}
