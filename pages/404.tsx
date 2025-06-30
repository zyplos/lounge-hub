import MainLayout from "@/internals/MainLayout";
import FullBox from "@/components/FullBox";
import styles from "@/styles/ErrorPages.module.css";

export default function Custom404() {
  return (
    <MainLayout noPadding>
      <FullBox useDims={true}>
        <h1 className={styles.heading}>404</h1>
        <p>Whatever you tried to access doesn't exist. Sorry!</p>
      </FullBox>
    </MainLayout>
  );
}
