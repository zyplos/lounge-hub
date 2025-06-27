import React from "react";
import WikiCard from "../../components/WikiCard/index";
import MainLayout from "../../internals/MainLayout";
import styles from "../../styles/WikiIndexPage.module.css"; // Adjusted path

// Import assets directly if they are not dynamically chosen based on props
import craftingTable from "../../assets/crafting-table.png";
// import glowstone from "../../assets/glowstone.png"; // Unused in this component
import grassBlock from "../../assets/grass-block.png";
import commandBlock from "../../assets/command-block.png";
// import skulkSensor from "../../assets/sculk_sensor.gif"; // Unused
import jigsawBlock from "../../assets/jigsaw-block.png";
// import endPortal from "../../assets/end-portal-frame-filled.png"; // Unused


function WikiHomePage() { // Renamed component
  return (
    <MainLayout>
      <div className={styles.wikiGrid}>
        <div className={styles.heroCard}>
          <p className={styles.heroTextLine1}>the lounge SMP's</p>
          <p className={styles.heroTextLine2}>Server Wiki</p>
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

export default WikiHomePage;
