import React from "react"; // useContext and useSWR are not directly used here, but kept if needed by hooks
import MainLayout from "../internals/MainLayout";
import DiscordServer from "../components/DiscordServer/index";
import MinecraftStatus from "../components/MinecraftStatus/index";
import Alert from "../components/Alert/index"; // Import new Alert component
import { useMinecraftData } from "../internals/MinecraftContext";
import styles from "../styles/IndexPage.module.css";

function Home() {
  const minecraftData = useMinecraftData();
  const vanilla = minecraftData ? minecraftData.vanilla : null;
  const modded = minecraftData ? minecraftData.modded : null;

  return (
    <MainLayout>
      <div className={styles.pageGrid}>
        <div className={styles.serversGrid}>
          <div className={styles.serverSection}>
            <h2 className={styles.sectionHeading}>Minecraft • Main Server</h2>
            <MinecraftStatus data={vanilla} />{" "}
            {/* ip prop removed as it was unused */}
          </div>
          <div className={styles.serverSection}>
            <h2 className={styles.sectionHeading}>Minecraft • Off-season</h2>
            <MinecraftStatus data={modded} /> {/* ip prop removed */}
          </div>
        </div>

        {/* Example of using the new Alert component if the commented out section were active */}
        {/* <Alert variant="info" className={styles.infoAlert}>
          The land claims system, player lookups, and other features are currently not working due to the recent release of Minecraft 1.20. They will be fixed as things
          are updated for the new version.
        </Alert> */}

        <h2 className={`${styles.sectionHeading} ${styles.loungeHeading}`}>
          the lounge
        </h2>
        <DiscordServer />
      </div>
    </MainLayout>
  );
}

export default Home;
