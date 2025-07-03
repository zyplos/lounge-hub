import MainLayout from "../MainLayout";
import styles from "./styles.module.css";

export default function ArticleLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <MainLayout>
      <div className={`${styles.articleContainer} responsiveCenteredContainer`}>
        <h1 className={styles.articleTitle}>{title}</h1>
        <hr className={styles.articleDivider} />
        {children}
      </div>
    </MainLayout>
  );
}
