import React from "react";
import SmallCardGrid from "../../components/SmallCardGrid";
import styles from "./styles.module.css";
import ArticleLayout from "../../internals/ArticleLayout";

const SmallerCardGrid = ({ ...props }) => <SmallCardGrid width="300px" {...props} />;
const EvenSmallerCardGrid = ({ ...props }) => <SmallCardGrid width="200px" {...props} />;
const FastLink = ({ href, children }) => (
  <a href={href} target="_blank" rel="noreferrer">
    {children}
  </a>
);

function Changelog() {
  return (
    <ArticleLayout title="Server History">
      <div className={styles.infoAlert}>i'll add world backups here sometime soon</div>
      <div className={styles.grid}>
        <div className={styles.sectionTitle}>Vanilla Minecraft</div>
        <SmallerCardGrid>
          <div className={styles.card}><div className={styles.cardTitle}>Season 6: Echoes of the Realm</div><div>1.20 <span className={styles.badge}>Current</span></div></div>
          <div className={styles.card}><div className={styles.cardTitle}>Season 6</div><div>1.19</div></div>
          <div className={styles.card}><div className={styles.cardTitle}>Season 5: Part II</div><div>1.18</div></div>
          <div className={styles.card}><div className={styles.cardTitle}>Season 5</div><div>1.17</div></div>
          <div className={styles.card}><div className={styles.cardTitle}>Season 4</div><div>1.16</div></div>
          <div className={styles.card}><div className={styles.cardTitle}>Season 3</div><div>1.14 / 1.15</div></div>
          <div className={styles.card}><div className={styles.cardTitle}>Season 2</div><div>1.13</div></div>
          <div className={styles.card}><div className={styles.cardTitle}>Season 1</div><div>1.13</div></div>
        </SmallerCardGrid>
        <div className={styles.sectionTitle}>Modded Minecraft</div>
        <EvenSmallerCardGrid>
          <div className={styles.card}><div className={styles.cardTitle}>Season 11</div><div><FastLink href="https://www.technicpack.net/modpack/tekkit-2.1935271">Tekkit 2</FastLink></div></div>
          <div className={styles.card}><div className={styles.cardTitle}>Season 10</div><div><FastLink href="https://drive.google.com/file/d/1mCPLbVJsjIM4IAEw-DVUjf7f1W8ELgzS/view?usp=sharing">kedr's FUNNY TIME FABRIC</FastLink></div></div>
          <div className={styles.card}><div className={styles.cardTitle}>Season 9</div><div><FastLink href="https://drive.google.com/file/d/1KaJf4n3wM_kOl0tj3boYhkBCYNTbAQAd/view?usp=sharing">ratpack</FastLink></div></div>
          <div className={styles.card}><div className={styles.cardTitle}>Season 8</div><div><FastLink href="https://drive.google.com/file/d/1-4UWqfbF16rS649tSf9EG3SrYNPsHJuG/view?usp=sharing">julian's lounge pack</FastLink></div></div>
          <div className={styles.card}><div className={styles.cardTitle}>Season 7</div><div><FastLink href="https://www.technicpack.net/modpack/vanilla-sprinkles-modpack.1780181">Vanilla & Sprinkles</FastLink></div></div>
          <div className={styles.card}><div className={styles.cardTitle}>Season 6</div><div><FastLink href="https://www.curseforge.com/minecraft/modpacks/enigmatica2">Enigmatica 2</FastLink></div></div>
          <div className={styles.card}><div className={styles.cardTitle}>Season 5</div><div><FastLink href="https://www.technicpack.net/modpack/tekxit-3-official-1122.1253751">Tekxit 3</FastLink></div></div>
          <div className={styles.card}><div className={styles.cardTitle}>Season 4</div><div><FastLink href="https://www.curseforge.com/minecraft/modpacks/enigmatica2">Enigmatica 2</FastLink></div></div>
          <div className={styles.card}><div className={styles.cardTitle}>Season 3</div><div><FastLink href="https://www.curseforge.com/minecraft/modpacks/skyfactory-4">SkyFactory 4</FastLink></div></div>
          <div className={styles.card}><div className={styles.cardTitle}>Season 2</div><div>Pixelmon</div></div>
          <div className={styles.card}><div className={styles.cardTitle}>Season 1</div><div><FastLink href="https://www.technicpack.net/modpack/zy-cos-modpack.1260752">zy & co.'s modpack</FastLink></div></div>
        </EvenSmallerCardGrid>
        <div className={styles.sectionTitle}>Terraria</div>
        <EvenSmallerCardGrid>
          <div className={styles.card}><div className={styles.cardTitle}>Season 2</div><div>Journey's End</div></div>
          <div className={styles.card}><div className={styles.cardTitle}>Season 1</div><div>1.3</div></div>
        </EvenSmallerCardGrid>
      </div>
    </ArticleLayout>
  );
}

export default Changelog;
