import React, { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useMinecraftData } from '../../internals/MinecraftContext'; // Adjusted path
import ThemeToggle from '../ThemeToggle/index';
import { mapUrlBase } from '../../internals/Utils'; // Adjusted path

// Import assets
import emblem from '../../assets/emblem.png';
import HomeIconImg from '../../assets/home-icon.png'; // Renamed to avoid conflict if HomeIcon component is made
import WikiIconImg from '../../assets/wiki-icon.png'; // Renamed
import PlayerIconImg from '../../assets/player-icon.png'; // Renamed
import CompassIcon from '../../assets/compass-icon.svg'; // This is an SVG component
import BlockIcon from '../../assets/block-icon.svg';   // This is an SVG component
import playerHead from '../../assets/head.png';
import computerHead from '../../assets/computer.png';

import styles from './styles.module.css';


// Local sub-components, now using CSS Modules
const NavMinecraftItem = ({ image, name, playerAmount }) => {
  return (
    <div className={styles.minecraftItemContainer}>
      <Image src={image} alt={name} width="32px" height="32px" />
      {playerAmount !== undefined && playerAmount !== null && (
        <div className={styles.minecraftItemLabel}>{playerAmount}</div>
      )}
    </div>
  );
};

const NavDivider = () => {
  return <div className={styles.navDivider}></div>;
};

const NavText = ({ children }) => {
  return <span className={styles.navText}>{children}</span>;
};


function Navbar() {
  const minecraftData = useMinecraftData();
  // console.log(minecraftData); // Keep for debugging

  const minecraftFragments = [];
  if (minecraftData?.vanilla || minecraftData?.modded) {
    const isVanillaOnline = minecraftData?.vanilla?.players?.online >= 0;
    const isModdedOnline = minecraftData?.modded?.players?.online >= 0;

    if (isVanillaOnline || isModdedOnline) {
      minecraftFragments.push(<NavDivider key="mc-divider" />);
    }
    if (isVanillaOnline) {
      minecraftFragments.push(
        <NavMinecraftItem key="vanilla-status" image={playerHead} name="Vanilla Server Status" playerAmount={minecraftData.vanilla.players.online} />
      );
    }
    if (isModdedOnline) {
      minecraftFragments.push(
        <NavMinecraftItem key="modded-status" image={computerHead} name="Modded Server Status" playerAmount={minecraftData.modded.players.online} />
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
                <Image src={emblem} alt="Emblem" layout="fixed" width="48px" height="28px" />
              </a>
            </Link>
          </div>

          <NavDivider />

          <Link href="/" passHref>
            <a className={styles.navLink}>
              <Image src={HomeIconImg} alt="Home Icon" width="32px" height="32px" />
              <NavText>Home</NavText>
            </a>
          </Link>

          <Link href="/wiki" passHref>
            <a className={styles.navLink}>
              <Image src={WikiIconImg} alt="Wiki Icon" width="32px" height="32px" />
              <NavText>Wiki</NavText>
            </a>
          </Link>

          <Link href="/mc" passHref>
            <a className={styles.navLink}>
              <BlockIcon className={styles.navIcon} /> {/* SVG components can take className */}
              <NavText>Minecraft</NavText>
            </a>
          </Link>

          <Link href="/mc/player" passHref>
            <a className={styles.navLink}>
              <Image src={PlayerIconImg} alt="Player Icon" width="32px" height="32px" />
              <NavText>Player Lookup</NavText>
            </a>
          </Link>

          <a href={mapUrlBase} target="_blank" rel="noreferrer" className={styles.navLink}>
            <CompassIcon className={styles.navIcon} /> {/* SVG components can take className */}
            <NavText>Server Map</NavText>
          </a>

          <ThemeToggle />

          {minecraftFragments}
        </div>
      </div>
    </Fragment>
  );
}

export default Navbar;
