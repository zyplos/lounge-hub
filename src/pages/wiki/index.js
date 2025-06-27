import React from "react";
import WikiCard from "../../components/WikiCard";
import styles from "./styles.module.css";

import craftingTable from "../../assets/crafting-table.png";
import glowstone from "../../assets/glowstone.png";
// import zombieHead from "../../assets/zombie-head.png";
import grassBlock from "../../assets/grass-block.png";
import commandBlock from "../../assets/command-block.png";
import skulkSensor from "../../assets/sculk_sensor.gif";
import jigsawBlock from "../../assets/jigsaw-block.png";
import MainLayout from "../../internals/MainLayout";
// import endPortal from "../../assets/end-portal-frame-filled.png";

function WikiHome() {
  return (
    <MainLayout>
      <div className={styles.grid}>
        <div className={styles.heroCard}>
          <span className={styles.heroTitle}>the lounge SMP's</span>
          <span className={styles.heroSubtitle}>Server Wiki</span>
        </div>
        <WikiCard
          link="/wiki/changelog"
          image={commandBlock}
          gradient={{ left: "#f0ac80", right: "#f65625" }}
          heading="Changelog"
          description="Record of all seasons so far."
        />
        <WikiCard
          link="/wiki/crafting-recipes"
          image={craftingTable}
          gradient={{ left: "#F05F57", right: "#360940" }}
          heading="Crafting Recipes"
          description="Makes obtaining some stuff a bit easier."
        />
        <WikiCard
          link="/wiki/gameplay"
          image={jigsawBlock}
          gradient={{ left: "#667eea", right: "#764ba2" }}
          heading="Gameplay"
          description="A few quality of life changes to Vanilla."
        />
        <WikiCard
          link="/wiki/land-claiming"
          image={grassBlock}
          gradient={{ left: "#67be51", right: "#267712" }}
          heading="Land Claiming"
          description="Claim land for your community."
        />
      </div>
    </MainLayout>
  );
}

export default WikiHome;
