import clsx from "clsx";
import MainLayout from "@/internals/MainLayout";
import DiscordServer from "@/components/DiscordServer";
import MinecraftStatus from "@/components/MinecraftStatus";
import { useMinecraftData } from "@/internals/MinecraftContext";

import styles from "@/styles/IndexPage.module.css";

function Home() {
  const minecraftData = useMinecraftData();
  const vanilla = minecraftData ? minecraftData.vanilla : null;
  const modded = minecraftData ? minecraftData.modded : null;

  return (
    <MainLayout>
      <div className={styles.sectionSpacer}>
        <section className={clsx("twoGrid", styles.serverGrid)}>
          <div className={styles.serverSection}>
            <h2 className={styles.sectionHeading}>Minecraft • Main Server</h2>
            <MinecraftStatus data={vanilla} />
          </div>
          <div className={styles.serverSection}>
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

export default Home;
