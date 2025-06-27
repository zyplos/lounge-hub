import React, { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './styles.module.css';

import { useMinecraftData } from '../../internals/MinecraftContext';

import emblem from '../../assets/emblem.png';
import HomeIcon from '../../assets/home-icon.png';
import WikiIcon from '../../assets/wiki-icon.png';
import PlayerIcon from '../../assets/player-icon.png';
import CompassIcon from '../../assets/compass-icon.svg';
import BlockIcon from '../../assets/block-icon.svg';
import playerHead from '../../assets/head.png';
import computerHead from '../../assets/computer.png';
import ThemeToggle from '../ThemeToggle';
import { mapUrlBase } from '../../internals/Utils';

const MinecraftContainer = (props) => (
  <div {...props} className={styles.minecraftContainer} />
);

const MinecraftLabel = (props) => (
  <div {...props} className={styles.minecraftLabel} />
);

const NavMinecraftItem = ({ image, name, playerAmount }) => {
  return (
    <MinecraftContainer>
      <Image src={image} alt={name} width={32} height={32} />
      <MinecraftLabel>{playerAmount}</MinecraftLabel>
    </MinecraftContainer>
  );
};

const NavDivider = () => <div className={styles.navDivider}></div>;

const NavText = ({ children }) => <span className={styles.navText}>{children}</span>;

function Navbar() {
  const minecraftData = useMinecraftData();
  const minecraftFragments = [];

  if (minecraftData?.vanilla || minecraftData?.modded) {
    const isVanillaOnline = minecraftData?.vanilla?.players?.online >= 0;
    const isModdedOnline = minecraftData?.modded?.players?.online >= 0;

    if (isVanillaOnline || isModdedOnline) {
      minecraftFragments.push(<NavDivider key={0} />);
    }

    if (isVanillaOnline) {
      minecraftFragments.push(
        <NavMinecraftItem key={1} image={playerHead} name="Vanilla Server Status" playerAmount={minecraftData?.vanilla?.players?.online} />
      );
    }

    if (isModdedOnline) {
      minecraftFragments.push(
        <NavMinecraftItem key={2} image={computerHead} name="Modded Server Status" playerAmount={minecraftData?.modded?.players?.online} />
      );
    }
  }

  return (
    <Fragment>
      <div className={styles.navbarScroll}>
        <div className={styles.grid}>
          <div className={styles.logoRow}>
            <Link href="/" passHref legacyBehavior>
              <a className={styles.logoLink}>
                <Image src={emblem} alt="emblem" width={48} height={28} />
              </a>
            </Link>
          </div>

          <NavDivider />

          <Link href="/" passHref legacyBehavior>
            <a className={styles.navLink}>
              <Image src={HomeIcon} alt="Home Icon" width={32} height={32} />
              <NavText>Home</NavText>
            </a>
          </Link>

          <Link href="/wiki" passHref legacyBehavior>
            <a className={styles.navLink}>
              <Image src={WikiIcon} alt="Wiki Icon" width={32} height={32} />
              <NavText>Wiki</NavText>
            </a>
          </Link>

          <Link href="/mc" passHref legacyBehavior>
            <a className={styles.navLink}>
              <BlockIcon className={styles.icon} />
              <NavText>Minecraft</NavText>
            </a>
          </Link>

          <Link href="/mc/player" passHref legacyBehavior>
            <a className={styles.navLink}>
              <Image src={PlayerIcon} alt="Player Icon" width={32} height={32} />
              <NavText>Player Lookup</NavText>
            </a>
          </Link>

          <a href={mapUrlBase} target="_blank" rel="noreferrer" className={styles.navLink}>
            <CompassIcon className={styles.icon} />
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