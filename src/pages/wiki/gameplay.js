import React from "react";
import Link from "next/link";
import MinecraftText from "../../components/MinecraftText";
import SmallCardGrid from "../../components/SmallCardGrid";
import ArticleLayout from "../../internals/ArticleLayout";
import styles from "./styles.module.css";

function Gameplay() {
  return (
    <ArticleLayout title="Gameplay">
      <div className={styles.content}>
        <p className={styles.text}>Some stuff on the server functions a little differently from Vanilla.</p>
        <p className={styles.text}>
          Various <Link href="/wiki/crafting-recipes">crafting recipes</Link> have been added to make things a bit easier.
        </p>

        <h2 className={styles.heading}>Gamerules</h2>
        <SmallCardGrid>
          <div className={styles.card}>
            <div className={styles.cardTitle}>keepInventory</div>
            <div>true</div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardTitle}>sleepingPercent</div>
            <div>33</div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardTitle}>doInsomnia</div>
            <div>false</div>
          </div>
        </SmallCardGrid>

        <h2 className={styles.heading}>Sleeping</h2>
        <p className={styles.text}>Only a third of the people online have to sleep for it to turn to day.</p>

        <h2 className={styles.heading}>Nicknames and Colors</h2>
        <p className={styles.text}>
          Players can set their own nickname by doing <MinecraftText>/nickname [name]</MinecraftText>. You can use Minecraft color codes in your nickname or use custom
          hex colors by using <MinecraftText>&#&lt;hexcolor&gt;</MinecraftText>.
        </p>
        <p className={styles.text}>
          For example, <MinecraftText>/nickname &#ff8408Zyp</MinecraftText> would give you an orange username with the nickname "Zyp". If you'd like just the color
          without a nickname, you can use <MinecraftText>/nickcolor [colorcode]</MinecraftText> to set your entire username to one color.
        </p>
        <p className={styles.text}>
          You can do <MinecraftText>/nonick</MinecraftText> to remove your nickname.
        </p>

        <h2 className={styles.heading}>Mobs</h2>
        <p className={styles.text}>
          All mobs have a chance to drop their own head as an item. These chances can be increased with the <b>Looting</b> enchantment.
        </p>
        <p className={styles.text}>Shulkers will always drop 2 Shulker Shells.</p>
        <p className={styles.text}>You can trade with Wandering Villagers to get Mini Blocks.</p>
        <p className={styles.text}>Phantoms will not spawn.</p>
      </div>
    </ArticleLayout>
  );
}

export default Gameplay;
