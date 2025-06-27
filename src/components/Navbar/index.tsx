import React, { Fragment } from 'react';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image'; // Import StaticImageData
import { useMinecraftData, MinecraftDataContextState } from '../../internals/MinecraftContext'; // Adjusted path, import context state type
import ThemeToggle from '../ThemeToggle/index';
import { mapUrlBase } from '../../internals/Utils'; // Adjusted path

// Import assets
import emblem from '../../assets/emblem.png';
import HomeIconImg from '../../assets/home-icon.png';
import WikiIconImg from '../../assets/wiki-icon.png';
import PlayerIconImg from '../../assets/player-icon.png';
import CompassIcon from '../../assets/compass-icon.svg'; // SVG as ReactComponent
import BlockIcon from '../../assets/block-icon.svg';   // SVG as ReactComponent
import playerHead from '../../assets/head.png';
import computerHead from '../../assets/computer.png';

import styles from './styles.module.css';

// Props for NavMinecraftItem
interface NavMinecraftItemProps {
  image: StaticImageData;
  name: string;
  playerAmount?: number | null;
}

const NavMinecraftItem: React.FC<NavMinecraftItemProps> = ({ image, name, playerAmount }) => {
  return (
    <div className={styles.minecraftItemContainer}>
      <Image src={image} alt={name} width={32} height={32} /> {/* Use numbers */}
      {playerAmount !== undefined && playerAmount !== null && (
        <div className={styles.minecraftItemLabel}>{playerAmount}</div>
      )}
    </div>
  );
};

// Props for NavDivider (none)
const NavDivider: React.FC = () => {
  return <div className={styles.navDivider}></div>;
};

// Props for NavText
interface NavTextProps {
  children: React.ReactNode;
}

const NavText: React.FC<NavTextProps> = ({ children }) => {
  return <span className={styles.navText}>{children}</span>;
};

const Navbar: React.FC = () => {
  const minecraftData: MinecraftDataContextState | null = useMinecraftData();
  // console.log(minecraftData);

  const minecraftFragments: JSX.Element[] = []; // Explicitly type the array

  // Ensure minecraftData and its properties exist before accessing them
  if (minecraftData) {
    // Check if 'online' is a number. Treat undefined 'online' as server being offline for this display logic.
    const isVanillaOnline = typeof minecraftData.vanilla?.players?.online === 'number';
    const vanillaPlayersOnline = isVanillaOnline ? minecraftData.vanilla!.players!.online : null;

    const isModdedOnline = typeof minecraftData.modded?.players?.online === 'number';
    const moddedPlayersOnline = isModdedOnline ? minecraftData.modded!.players!.online : null;

    if (vanillaPlayersOnline !== null || moddedPlayersOnline !== null) {
      minecraftFragments.push(<NavDivider key="mc-divider" />);
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
    <Fragment>
      <div className={styles.navbarOuterContainer}>
        <div className={styles.navGrid}>
          <div className={styles.emblemContainer}>
            <Link href="/" passHref>
              <a className={styles.emblemLink}>
                <Image src={emblem} alt="Emblem" layout="fixed" width={48} height={28} /> {/* Use numbers */}
              </a>
            </Link>
          </div>

          <NavDivider />

          <Link href="/" passHref>
            <a className={styles.navLink}>
              <Image src={HomeIconImg} alt="Home Icon" width={32} height={32} /> {/* Use numbers */}
              <NavText>Home</NavText>
            </a>
          </Link>

          <Link href="/wiki" passHref>
            <a className={styles.navLink}>
              <Image src={WikiIconImg} alt="Wiki Icon" width={32} height={32} /> {/* Use numbers */}
              <NavText>Wiki</NavText>
            </a>
          </Link>

          <Link href="/mc" passHref>
            <a className={styles.navLink}>
              <BlockIcon className={styles.navIcon} /> {/* SVG components accept className */}
              <NavText>Minecraft</NavText>
            </a>
          </Link>

          <Link href="/mc/player" passHref>
            <a className={styles.navLink}>
              <Image src={PlayerIconImg} alt="Player Icon" width={32} height={32} /> {/* Use numbers */}
              <NavText>Player Lookup</NavText>
            </a>
          </Link>

          <a href={mapUrlBase} target="_blank" rel="noreferrer" className={styles.navLink}>
            <CompassIcon className={styles.navIcon} /> {/* SVG components accept className */}
            <NavText>Server Map</NavText>
          </a>

          <ThemeToggle />

          {minecraftFragments}
        </div>
      </div>
    </Fragment>
  );
};

export default Navbar;
