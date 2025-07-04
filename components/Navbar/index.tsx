import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import clsx from "clsx";
import ThemeToggle from "@/components/ThemeToggle";
import { mapUrlBase } from "@/internals/Utils";
import {
  useMinecraftData,
  MinecraftDataContextState,
} from "@/internals/MinecraftContext";

import styles from "./styles.module.scss";

import emblem from "@/assets/emblem.png";
import HomeIconImg from "@/assets/home-icon.png";
import WikiIconImg from "@/assets/wiki-icon.png";
import PlayerIconImg from "@/assets/player-icon.png";
import playerHead from "@/assets/head.png";
import computerHead from "@/assets/computer.png";

export default function Navbar() {
  const minecraftData: MinecraftDataContextState | null = useMinecraftData();
  // console.log(minecraftData);

  const minecraftFragments: React.ReactNode[] = [];

  // Ensure minecraftData and its properties exist before accessing them
  if (minecraftData) {
    // Check if 'online' is a number. Treat undefined 'online' as server being offline for this display logic.
    const isVanillaOnline =
      typeof minecraftData.vanilla?.players?.online === "number";
    const vanillaPlayersOnline = isVanillaOnline
      ? minecraftData.vanilla!.players!.online
      : null;

    const isModdedOnline =
      typeof minecraftData.modded?.players?.online === "number";
    const moddedPlayersOnline = isModdedOnline
      ? minecraftData.modded!.players!.online
      : null;

    if (vanillaPlayersOnline !== null || moddedPlayersOnline !== null) {
      minecraftFragments.push(<div className={styles.navDivider} />);
    }

    if (vanillaPlayersOnline !== null) {
      minecraftFragments.push(
        <NavMinecraftItem
          key="vanilla-status"
          image={playerHead}
          name="Vanilla Server Status"
          playerAmount={vanillaPlayersOnline}
        />
      );
    }

    if (moddedPlayersOnline !== null) {
      minecraftFragments.push(
        <NavMinecraftItem
          key="modded-status"
          image={computerHead}
          name="Modded Server Status"
          playerAmount={moddedPlayersOnline}
        />
      );
    }
  }

  return (
    <>
      <div className={styles.navbarWrapper}>
        <div className={styles.navGrid}>
          <Link href="/" className={styles.centerItem}>
            <Image src={emblem} alt="Emblem" width={48} height={28} />
          </Link>

          <div className={styles.navDivider} />

          <Link href="/" className={styles.navLink}>
            <Image src={HomeIconImg} alt="Home Icon" width={32} height={32} />
            <span className={styles.navText}>Home</span>
          </Link>

          <Link href="/wiki" className={styles.navLink}>
            <Image src={WikiIconImg} alt="Wiki Icon" width={32} height={32} />
            <span className={styles.navText}>Wiki</span>
          </Link>

          <Link href="/mc" className={styles.navLink}>
            <BlockIcon />
            <span className={styles.navText}>Minecraft</span>
          </Link>

          <Link href="/mc/player" className={styles.navLink}>
            <Image
              src={PlayerIconImg}
              alt="Player Icon"
              width={32}
              height={32}
            />
            <span className={styles.navText}>Player Lookup</span>
          </Link>

          <a
            href={mapUrlBase}
            target="_blank"
            rel="noreferrer"
            className={styles.navLink}
          >
            <CompassIcon />
            <span className={styles.navText}>Server Map</span>
          </a>

          <ThemeToggle />

          {minecraftFragments}
        </div>
      </div>
    </>
  );
}

interface NavMinecraftItemProps {
  image: StaticImageData;
  name: string;
  playerAmount?: number | null;
}

function NavMinecraftItem({
  image,
  name,
  playerAmount,
}: NavMinecraftItemProps) {
  return (
    <div className={clsx(styles.minecraftItemContainer, styles.centerItem)}>
      <Image src={image} alt={name} width={32} height={32} />{" "}
      {playerAmount !== undefined && playerAmount !== null && (
        <div className={styles.minecraftItemLabel}>{playerAmount}</div>
      )}
    </div>
  );
}

function CompassIcon() {
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: decorative
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={32}
      height={32}
      className={styles.navIcon}
    >
      <path d="M55.5,37.56C49.15,41,40.8,42.83,32,42.83S14.85,41,8.5,37.56a26.27,26.27,0,0,1-6.83-5.11v9.3C1.67,50.72,15.25,58,32,58s30.33-7.28,30.33-16.25v-9.3A26.27,26.27,0,0,1,55.5,37.56Z" />
      <path d="M32,6C15.25,6,1.67,13.28,1.67,22.25a9.79,9.79,0,0,0,.07,1.08C2.78,31.8,15.93,38.5,32,38.5s29.22-6.7,30.26-15.17a9.79,9.79,0,0,0,.07-1.08C62.33,13.28,48.75,6,32,6ZM46.08,32,33.21,25.07a9.46,9.46,0,0,1-1.21.08c-2.28,0-4.22-.75-5-1.82a1.8,1.8,0,0,1-.4-1.08,1.78,1.78,0,0,1,.35-1l-9-8.76,12.87,6.93A9.46,9.46,0,0,1,32,19.35c3,0,5.42,1.3,5.42,2.9a1.78,1.78,0,0,1-.35,1l.09.09Z" />
    </svg>
  );
}

function BlockIcon() {
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: decorative
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={32}
      height={32}
      className={styles.navIcon}
    >
      <path d="M8,22.89,28,34.32V57.11L8,45.68V22.89M4,16V48L32,64V32L4,16Z" />
      <path d="M56,22.89V45.68L36,57.11V34.32L56,22.89M60,16,32,32V64L60,48V16Z" />
      <polygon points="32 0 4 16 4 25 32 41 60 25 60 16 32 0" />
      <polygon points="33 63 32 64 31 63 29.5 38 34.5 38 33 63" />
    </svg>
  );
}
