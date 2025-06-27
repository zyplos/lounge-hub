import React from 'react';
import Link from "next/link";
import MinecraftText from "../../components/MinecraftText/index";
import SmallCardGrid from "../../components/SmallCardGrid/index";
import ArticleLayout from "../../internals/ArticleLayout";
import styles from "../../styles/GameplayPage.module.css"; // Adjusted path

function GameplayPage() { // Renamed component
  return (
    <ArticleLayout title="Gameplay">
      <div className={styles.pageGrid}>
        <p className={styles.paragraphText}>Some stuff on the server functions a little differently from Vanilla.</p>
        <p className={styles.paragraphText}>
          Various <Link href="/wiki/crafting-recipes" passHref className={styles.inlineLink}>crafting recipes</Link> have been added to make things a bit easier.
        </p>

        <h2 className={styles.sectionHeading}>Gamerules</h2>
        <SmallCardGrid>
          <div>
            <h3 className={styles.gameruleCardHeading}>keepInventory</h3>
            <p className={styles.gameruleCardText}>true</p>
          </div>
          <div>
            <h3 className={styles.gameruleCardHeading}>sleepingPercent</h3>
            <p className={styles.gameruleCardText}>33</p>
          </div>
          <div>
            <h3 className={styles.gameruleCardHeading}>doInsomnia</h3>
            <p className={styles.gameruleCardText}>false</p>
          </div>
        </SmallCardGrid>

        <h2 className={styles.sectionHeading}>Sleeping</h2>
        <p className={styles.paragraphText}>Only a third of the people online have to sleep for it to turn to day.</p>

        <h2 className={styles.sectionHeading}>Nicknames and Colors</h2>
        <p className={styles.paragraphText}>
          Players can set their own nickname by doing <MinecraftText>/nickname [name]</MinecraftText>. You can use Minecraft color codes in your nickname or use custom
          hex colors by using <MinecraftText>&#&lt;hexcolor&gt;</MinecraftText>.
        </p>
        <p className={styles.paragraphText}>
          For example, <MinecraftText>/nickname &#ff8408Zyp</MinecraftText> would give you an orange username with the nickname "Zyp". If you'd like just the color
          without a nickname, you can use <MinecraftText>/nickcolor [colorcode]</MinecraftText> to set your entire username to one color.
        </p>
        <p className={styles.paragraphText}>
          You can do <MinecraftText>/nonick</MinecraftText> to remove your nickname.
        </p>

        <h2 className={styles.sectionHeading}>Mobs</h2>
        <p className={styles.paragraphText}>
          All mobs have a chance to drop their own head as an item. These chances can be increased with the <span className={styles.boldText}>Looting</span> enchantment.
        </p>
        <p className={styles.paragraphText}>Shulkers will always drop 2 Shulker Shells.</p>
        <p className={styles.paragraphText}>You can trade with Wandering Villagers to get Mini Blocks.</p>
        <p className={styles.paragraphText}>Phantoms will not spawn.</p>
      </div>
    </ArticleLayout>
  );
}

export default GameplayPage;
