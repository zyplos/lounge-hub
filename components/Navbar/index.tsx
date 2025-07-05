import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import clsx from "clsx";
import ThemeToggle from "@/components/ThemeToggle";
import { mapUrlBase } from "@/internals/Utils";
import {
  useMinecraftData,
  type MinecraftDataContextState,
} from "@/internals/MinecraftContext";
import {
  BlockIcon,
  BookIcon,
  CompassIcon,
  HomeIcon,
  PlayerIcon,
} from "../Icon";

import styles from "./styles.module.scss";

import emblem from "@/assets/emblem.png";
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
            <HomeIcon />
            <span className={styles.navText}>Home</span>
          </Link>

          <Link href="/wiki" className={styles.navLink}>
            <BookIcon />
            <span className={styles.navText}>Wiki</span>
          </Link>

          <Link href="/mc" className={styles.navLink}>
            <BlockIcon />
            <span className={styles.navText}>Minecraft</span>
          </Link>

          <Link href="/mc/player" className={styles.navLink}>
            <PlayerIcon />
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
