import { Fullbox } from "@/components/Fullbox";
import MainLayout from "../MainLayout";
import styles from "./styles.module.scss";
import Spinner from "@/components/Spinner";

interface BlueMapLayoutProps {
  children: React.ReactNode;
  mapUrl?: string;
  title?: string;
}

export default function BlueMapLayout({
  children,
  mapUrl,
  title,
}: BlueMapLayoutProps) {
  return (
    <MainLayout noPadding={true}>
      <div className={styles.layoutWrapper}>
        <div className={styles.sidebarWrapper}>{children}</div>

        <div>
          {mapUrl ? (
            <iframe
              className={styles.mapIframe}
              src={mapUrl}
              title={title || "BlueMap"}
            />
          ) : (
            <Fullbox>
              <Spinner />{" "}
            </Fullbox>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
