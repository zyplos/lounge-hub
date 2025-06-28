import MainLayout from "../internals/MainLayout";
import FullBox from "../components/FullBox/index"; // Updated path
import styles from "../styles/ErrorPage.module.css";
import { NextPageContext } from "next";

interface ErrorProps {
  statusCode: number;
}

function Error({ statusCode }: ErrorProps) {
  return (
    <MainLayout noPadding>
      <FullBox useDims={true}>
        <h1 className={styles.heading}>oops</h1>
        <p className={styles.message}>
          {statusCode
            ? `An error ${statusCode} occurred on the server.`
            : "An error occurred on client."}
        </p>
      </FullBox>
    </MainLayout>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext): ErrorProps => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode: statusCode || 500 }; // Ensure statusCode is always a number
};

export default Error;
