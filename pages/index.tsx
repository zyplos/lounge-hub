import clsx from "clsx";
import MainLayout from "@/internals/MainLayout";
import DiscordServer from "@/components/DiscordServer";
import MinecraftStatus from "@/components/MinecraftStatus";
import { useMinecraftData } from "@/internals/MinecraftContext";

import styles from "@/styles/HomePage.module.css";
import Alert from "@/components/Alert";

export default function HomePage() {
  const { vanilla, modded } = useMinecraftData();

  return (
    <MainLayout>
      <Alert
        variant="info"
        className="paragraphMargin"
        style={{ display: "inline-block" }}
      >
        The player directory, land claims profiles, and visitor's log are
        temporarily unavailable due to database upgrades being done in the
        background.
      </Alert>
      <div className={styles.sectionSpacer}>
        <section className={clsx("twoGrid", styles.serverGrid)}>
          <div>
            <h2 className={styles.sectionHeading}>Minecraft • Main Server</h2>
            <MinecraftStatus data={vanilla} />
          </div>
          <div>
            <h2 className={styles.sectionHeading}>Minecraft • Off-season</h2>
            <MinecraftStatus data={modded} />
          </div>
        </section>

        <section>
          <h2 className={clsx(styles.sectionHeading, styles.loungeHeading)}>
            the lounge
          </h2>
          <DiscordServer />
        </section>
      </div>
    </MainLayout>
  );
}
