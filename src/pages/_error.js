import MainLayout from "../internals/MainLayout";
import FullBox from "../components/FullBox/index"; // Updated path
import styles from "../styles/ErrorPage.module.css";

function CustomErrorPage({ statusCode }) { // Renamed component
  return (
    <MainLayout noPadding>
      <FullBox useDims={true}>
        <h1 className={styles.heading}>oops</h1>
        <p className={styles.message}>
          {statusCode
            ? `An error ${statusCode} occurred on the server`
            : "An error occurred on client"}
        </p>
      </FullBox>
    </MainLayout>
  );
}

CustomErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default CustomErrorPage;
