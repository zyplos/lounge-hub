import React from "react";
import SmallCardGrid from "../../components/SmallCardGrid/index";
import ArticleLayout from "../../internals/ArticleLayout";
import Alert from "../../components/Alert/index"; // Custom Alert
import styles from "../../styles/ChangelogPage.module.css"; // Adjusted path

// Local components, now using CSS Modules
const SmallerCardGrid = ({ children, ...props }) => (
  <SmallCardGrid width="300px" {...props}>
    {children}
  </SmallCardGrid>
);
const EvenSmallerCardGrid = ({ children, ...props }) => (
  <SmallCardGrid width="200px" {...props}>
    {children}
  </SmallCardGrid>
);

const FastLink = ({ href, children }) => (
  <a href={href} target="_blank" rel="noreferrer" className={styles.fastLink}>
    {children}
  </a>
);

// Helper for card content
const SeasonCard = ({
  title,
  details = "",
  isCurrent = false,
  linkHref = "",
  linkText = "",
}) => (
  <div>
    <h3 className={styles.cardHeading}>{title}</h3>
    <p className={styles.cardText}>
      {linkHref ? (
        <FastLink href={linkHref}>{linkText || details}</FastLink>
      ) : (
        details
      )}
      {isCurrent && <span className={styles.currentBadge}>Current</span>}
    </p>
  </div>
);

function ChangelogPage() {
  // Renamed component
  return (
    <ArticleLayout title="Server History">
      <Alert variant="info" className={styles.infoAlert}>
        i'll add world backups here sometime soon
      </Alert>
      <div className={styles.pageGrid}>
        <h2 className={styles.sectionHeading}>Vanilla Minecraft</h2>
        <SmallerCardGrid>
          <SeasonCard
            title="Season 6: Echoes of the Realm"
            details="1.20"
            isCurrent
          />
          <SeasonCard title="Season 6" details="1.19" />
          <SeasonCard title="Season 5: Part II" details="1.18" />
          <SeasonCard title="Season 5" details="1.17" />
          <SeasonCard title="Season 4" details="1.16" />
          <SeasonCard title="Season 3" details="1.14 / 1.15" />
          <SeasonCard title="Season 2" details="1.13" />
          <SeasonCard title="Season 1" details="1.13" />
        </SmallerCardGrid>

        <h2 className={styles.sectionHeading}>Modded Minecraft</h2>
        <EvenSmallerCardGrid>
          <SeasonCard
            title="Season 11"
            linkHref="https://www.technicpack.net/modpack/tekkit-2.1935271"
            linkText="Tekkit 2"
          />
          <SeasonCard
            title="Season 10"
            linkHref="https://drive.google.com/file/d/1mCPLbVJsjIM4IAEw-DVUjf7f1W8ELgzS/view?usp=sharing"
            linkText="kedr's FUNNY TIME FABRIC"
          />
          <SeasonCard
            title="Season 9"
            linkHref="https://drive.google.com/file/d/1KaJf4n3wM_kOl0tj3boYhkBCYNTbAQAd/view?usp=sharing"
            linkText="ratpack"
          />
          <SeasonCard
            title="Season 8"
            linkHref="https://drive.google.com/file/d/1-4UWqfbF16rS649tSf9EG3SrYNPsHJuG/view?usp=sharing"
            linkText="julian's lounge pack"
          />
          <SeasonCard
            title="Season 7"
            linkHref="https://www.technicpack.net/modpack/vanilla-sprinkles-modpack.1780181"
            linkText="Vanilla & Sprinkles"
          />
          <SeasonCard
            title="Season 6"
            linkHref="https://www.curseforge.com/minecraft/modpacks/enigmatica2"
            linkText="Enigmatica 2"
          />
          <SeasonCard
            title="Season 5"
            linkHref="https://www.technicpack.net/modpack/tekxit-3-official-1122.1253751"
            linkText="Tekxit 3"
          />
          <SeasonCard
            title="Season 4"
            linkHref="https://www.curseforge.com/minecraft/modpacks/enigmatica2"
            linkText="Enigmatica 2"
          />
          <SeasonCard
            title="Season 3"
            linkHref="https://www.curseforge.com/minecraft/modpacks/skyfactory-4"
            linkText="SkyFactory 4"
          />
          <SeasonCard title="Season 2" details="Pixelmon" />
          <SeasonCard
            title="Season 1"
            linkHref="https://www.technicpack.net/modpack/zy-cos-modpack.1260752"
            linkText="zy & co.'s modpack"
          />
        </EvenSmallerCardGrid>

        <h2 className={styles.sectionHeading}>Terraria</h2>
        <EvenSmallerCardGrid>
          <SeasonCard title="Season 2" details="Journey's End" />
          <SeasonCard title="Season 1" details="1.3" />
        </EvenSmallerCardGrid>
      </div>
    </ArticleLayout>
  );
}
export default ChangelogPage;
