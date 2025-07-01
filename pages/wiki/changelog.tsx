import clsx from "clsx";
import ArticleLayout from "@/internals/ArticleLayout";
import { NewTabLink } from "@/components/NewTabLink";

import styles from "@/styles/ChangelogPage.module.scss";

export default function ChangelogPage() {
  return (
    <ArticleLayout title="Server History">
      <div className={styles.pageGrid}>
        {/* <Alert variant="info" className={styles.infoAlert}>
          i'll add world backups here sometime soon
        </Alert> */}

        <section>
          <h2 className={styles.sectionHeading}>Vanilla Minecraft</h2>
          <div className={clsx(styles.grid, styles.biggerGrid)}>
            <SeasonCard title="Season 6: Echoes of the Realm" details="1.20" />
            <SeasonCard title="Season 6" details="1.19" />
            <SeasonCard title="Season 5: Part II" details="1.18" />
            <SeasonCard title="Season 5" details="1.17" />
            <SeasonCard title="Season 4" details="1.16" />
            <SeasonCard title="Season 3" details="1.14 / 1.15" />
            <SeasonCard title="Season 2" details="1.13" />
            <SeasonCard title="Season 1" details="1.13" />
          </div>
        </section>

        <section>
          <h2 className={styles.sectionHeading}>Modded Minecraft</h2>
          <div className={styles.grid}>
            <SeasonCard
              title="Season 11"
              details={
                <NewTabLink
                  href="https://www.technicpack.net/modpack/tekkit-2.1935271"
                  tooltip="Technic Launcher"
                >
                  Tekkit 2
                </NewTabLink>
              }
            />

            {/* <SeasonCard
              title="Season 10"
              details={
                <NewTabLink
                  href="https://drive.google.com/file/d/1mCPLbVJsjIM4IAEw-DVUjf7f1W8ELgzS/view?usp=sharing"
                  tooltip="Modrinth Pack"
                >
                  kedr's FUNNY TIME FABRIC
                </NewTabLink>
              }
            /> */}

            <SeasonCard
              title="Season 9"
              details={
                <NewTabLink
                  href="https://drive.google.com/file/d/1KaJf4n3wM_kOl0tj3boYhkBCYNTbAQAd/view?usp=sharing"
                  tooltip="mods.zip"
                >
                  ratpack
                </NewTabLink>
              }
            />

            <SeasonCard
              title="Season 8"
              details={
                <NewTabLink
                  href="https://drive.google.com/file/d/1-4UWqfbF16rS649tSf9EG3SrYNPsHJuG/view?usp=sharing"
                  tooltip="mods.zip"
                >
                  julian's lounge pack
                </NewTabLink>
              }
            />

            <SeasonCard
              title="Season 7"
              details={
                <NewTabLink
                  href="https://www.technicpack.net/modpack/vanilla-sprinkles-modpack.1780181"
                  tooltip="Technic Launcher"
                >
                  Vanilla & Sprinkles
                </NewTabLink>
              }
            />

            <SeasonCard
              title="Season 6"
              details={
                <NewTabLink
                  href="https://www.curseforge.com/minecraft/modpacks/enigmatica2"
                  tooltip="Curseforge"
                >
                  Enigmatica 2
                </NewTabLink>
              }
            />

            <SeasonCard
              title="Season 5"
              details={
                <NewTabLink
                  href="https://www.technicpack.net/modpack/tekxit-3-official-1122.1253751"
                  tooltip="Technic Launcher"
                >
                  Tekxit 3
                </NewTabLink>
              }
            />

            <SeasonCard
              title="Season 4"
              details={
                <NewTabLink
                  href="https://www.curseforge.com/minecraft/modpacks/enigmatica2"
                  tooltip="Curseforge"
                >
                  Enigmatica 2
                </NewTabLink>
              }
            />

            <SeasonCard
              title="Season 3"
              details={
                <NewTabLink
                  href="https://www.curseforge.com/minecraft/modpacks/skyfactory-4"
                  tooltip="Curseforge"
                >
                  SkyFactory 4
                </NewTabLink>
              }
            />

            <SeasonCard title="Season 2" details="Pixelmon" />

            <SeasonCard
              title="Season 1"
              details={
                <NewTabLink
                  href="https://www.technicpack.net/modpack/zy-cos-modpack.1260752"
                  tooltip="Technic Launcher"
                >
                  zy & co.'s modpack
                </NewTabLink>
              }
            />
          </div>
        </section>

        <section>
          <h2 className={styles.sectionHeading}>Terraria</h2>
          <div className={styles.grid}>
            <SeasonCard title="Season 2" details="Journey's End" />
            <SeasonCard title="Season 1" details="1.3" />
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}

interface SeasonCardProps {
  title: string;
  details?: React.ReactNode;
}

function SeasonCard({ title, details }: SeasonCardProps) {
  return (
    <div>
      <p className={styles.cardHeading}>{title}</p>
      <p className={styles.cardText}>{details}</p>
    </div>
  );
}
