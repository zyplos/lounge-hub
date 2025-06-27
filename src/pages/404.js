import MainLayout from "../internals/MainLayout";
import FullBox from "../components/FullBox/index"; // Updated path
import styles from "../styles/404.module.css";

function Error404() { // Renamed to avoid conflict with global Error if any
  return (
    <MainLayout noPadding>
      <FullBox useDims={true}>
        <h1 className={styles.heading}>404</h1>
        <p className={styles.message}>Whatever you tried to access doesn't exist.</p>
      </FullBox>
    </MainLayout>
  );
}

export default Error404;
