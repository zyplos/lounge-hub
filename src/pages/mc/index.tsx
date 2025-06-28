import React from 'react'; // Removed unused imports like Box, Container etc. from theme-ui
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link'; // Keep Link if used by any sub-component, though not directly in this snippet

import MainLayout from '../../internals/MainLayout';
import Yourspace from '../../components/Yourspace/index'; // Already migrated
import Button from '../../components/Button/index'; // Custom button

// Assets (ensure paths are correct)
import InvitationSplashImage from '../../assets/invitation-splash.png';
import EmblemMCImage from '../../assets/emblem-mc.png';
// Unused image assets commented out for now:
// import ChunkClaimImage from '../../assets/chunk-claim.png';
// import CloudsMiscImage from '../../assets/clouds-misc.png';
// import WorldgenPackImage from '../../assets/worldgen-pack.png';
import CID1 from '../../assets/ref/1.png';
import CID2 from '../../assets/ref/2.png';
import CID3 from '../../assets/ref/3.png';
import CID4 from '../../assets/ref/4.png';
import CID5 from '../../assets/ref/5.png';
import CID6 from '../../assets/ref/6.png';

import styles from '../../styles/MCIndexPage.module.css'; // Adjusted path

// Local Sub-components, now using CSS Modules

const ModifiedH2 = ({ children }) => {
  return (
    <h2 className={`${styles.modifiedH2} text-h1`}>{/* text-h1 applies h1 styling from _common.css */}
      {children}
    </h2>
  );
};

// SectionBox is not used in MCHomeNotSignedIn, so definition can be removed or kept if planned for future use.
// For now, commenting out to reduce unused code.
/*
const SectionBox = ({ heading, image, children, isAlt, ...props }) => {
  const textGridOrderClass = !isAlt ? styles.sectionTextGridOrder1 : styles.sectionTextGridOrder2;
  const imageOrderClass = !isAlt ? styles.sectionImageOrder2 : styles.sectionImageOrder1;
  return (
    <div className={styles.sectionBox} {...props} style={{ backgroundColor: '#16161b' }}>
      <div className={`${styles.sectionTextGrid} ${textGridOrderClass}`}>
        <h2 className={`${styles.sectionHeading} text-h1`}>{heading}</h2>
        {children}
      </div>
      <div
        className={`${styles.sectionImage} ${imageOrderClass}`}
        style={{ backgroundImage: `url(${image.src})` }}
      ></div>
    </div>
  );
};
*/

const CenterSectionBox = ({ children }) => {
  return (
    <div className={styles.centerSection}>
      <div className="container">{/* Using global .container class */}
        {children}
      </div>
    </div>
  );
};

const SignInButton = () => {
  return (
    <Button variant="discord" onClick={() => signIn("discord", { callbackUrl: "/mc" })}>
      Sign in with Discord
    </Button>
  );
};

const MCHomeNotSignedIn = () => {
  return (
    <MainLayout noPadding>
      <div className={styles.notSignedInContainer}>
        <div className={styles.heroSection} style={{ backgroundImage: `url(${InvitationSplashImage.src})` }}>
          <div className={styles.heroEmblem}>
            <Image src={EmblemMCImage} alt="Emblem MC" layout="responsive" priority />
          </div>
          <div className={styles.heroTextContent}>
            <h1 className={`${styles.heroHeading} text-h1`}>
              the lounge SMP server
            </h1>
            <p className={`${styles.heroSubheading} text-display`}>
              season 6
            </p>
            <p className={`${styles.heroSeasonText} text-displaysm`}>
              echoes of the realm
            </p>
            <div className={styles.signInButtonContainer}>
              <SignInButton />
            </div>
            <p className={styles.scrollDownText}>
              scroll down!
            </p>
          </div>
        </div>

        <CenterSectionBox>
          <ModifiedH2>latest vanilla release</ModifiedH2>
          <p className={styles.centerSectionParagraph}>lounge mutuals only. Sign in to see if you're on the allowlist.</p>
          <SignInButton />
          <p className={`${styles.centerSectionParagraph} ${styles.centerSectionParagraphMt}`}>Or ask for the IP from anyone you recognize below!</p>
          <div className={styles.cidImageGrid}>
            <Image width="200" height="200" src={CID1} alt="1" layout="fixed" />
            <Image width="200" height="200" src={CID2} alt="2" layout="fixed" />
            <Image width="200" height="200" src={CID3} alt="3" layout="fixed" />
            <Image width="200" height="200" src={CID4} alt="4" layout="fixed" />
            <Image width="200" height="200" src={CID5} alt="5" layout="fixed" />
            <Image width="200" height="200" src={CID6} alt="6" layout="fixed" />
          </div>
        </CenterSectionBox>
      </div>
    </MainLayout>
  );
};

function MCHome() {
  const { data: session } = useSession(); // status not used directly here
  if (session) {
    return <Yourspace />;
  } else {
    return <MCHomeNotSignedIn />;
  }
}

export default MCHome;
