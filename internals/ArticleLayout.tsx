import React from "react";
import MainLayout from "./MainLayout";
import styles from "../styles/ArticleLayout.module.css"; // Adjusted path

function ArticleLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <MainLayout>
      <div className={`${styles.articleContainer} container`}>
        {" "}
        {/* Using both for clarity or if _common.container is preferred */}
        <h1 className={styles.articleTitle}>{title}</h1>
        <hr className={styles.articleDivider} />
        {children}
      </div>
    </MainLayout>
  );
}

export default ArticleLayout;
