import React from "react";
import MainLayout from "../internals/MainLayout";
import useSWR from "swr";
import DiscordServer from "../components/DiscordServer";
import MinecraftStatus from "../components/MinecraftStatus";
import { useMinecraftData } from "../internals/MinecraftContext";
import styles from "./styles.module.css";

function Home() {
  const minecraftData = useMinecraftData();
  const vanilla = minecraftData ? minecraftData.vanilla : null;
  const modded = minecraftData ? minecraftData.modded : null;

  return (
    <MainLayout>
      <div className={styles.grid}>
        <div className={styles.statusGrid}>
          <div>
            <h2 className={styles.heading}>Minecraft • Main Server</h2>
            <MinecraftStatus data={vanilla} ip="???" />
          </div>
          <div>
            <h2 className={styles.heading}>Minecraft • Off-season</h2>
            <MinecraftStatus data={modded} ip="???" />
          </div>
        </div>
        {/*
        <div className={styles.infoAlert}>
          The land claims system, player lookups, and other features are currently not working due to the recent release of Minecraft 1.20. They will be fixed as things
          are updated for the new version.
        </div>
        */}
        <h2 className={styles.heading}>the lounge</h2>
        <DiscordServer />
      </div>
    </MainLayout>
  );
}

export default Home;
