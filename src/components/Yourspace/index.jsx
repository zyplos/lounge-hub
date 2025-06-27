import React from 'react'; // Removed useState, useContext for now, add if needed by main logic
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import MainLayout from '../../internals/MainLayout'; // Adjusted path
import LoadingFullBox from '../LoadingFullBox/index';
import DiscordIcon from '../../assets/discord-icon.svg'; // Adjusted path
import CBOAIcon from '../../assets/cbOA-icon.svg';   // Adjusted path
import useSWR from 'swr';
import { useMinecraftData } from '../../internals/MinecraftContext'; // Adjusted path
import MinecraftStatus from '../MinecraftStatus/index';
import Button from '../Button/index'; // Using new Button
import ThemedRouterButtonLink from '../ThemedRouterButtonLink/index';
import FullBox from '../FullBox/index';

// Image assets (ensure paths are correct relative to `public` or handled by Next.js import)
import CID1 from '../../assets/ref/1.png'; // Adjusted path
import CID2 from '../../assets/ref/2.png';
import CID3 from '../../assets/ref/3.png';
import CID4 from '../../assets/ref/4.png';
import CID5 from '../../assets/ref/5.png';
import CID6 from '../../assets/ref/6.png';
import InvitationSplashImage from '../../assets/invitation-splash.png'; // Adjusted path

import styles from './styles.module.css';

// DiscordHeader Sub-component
const DiscordHeader = ({ session, cbData }) => {
  const headerStyle = {
    backgroundImage: `url(${session.user.banner || InvitationSplashImage.src})`,
  };
  const profileImageBorderStyle = {
    border: `14px solid ${cbData?.hex || "#111"}`,
  };

  return (
    <div className={styles.discordHeader} style={headerStyle}>
      <div className={styles.discordHeaderOverlay} />
      <div className={styles.discordHeaderContent}>
        <div className={styles.profileImageContainer}>
          <Image
            src={session.user.image}
            alt={`${session.user.name}'s profile picture`}
            width="200px"
            height="200px"
            layout="fixed"
            priority
            style={profileImageBorderStyle} // Apply dynamic border directly
            className={styles.profileImage} // For other static styles if needed
          />
        </div>
        <div className={styles.userInfoGrid}>
          <h1 className={`${styles.usernameHeading} text-display2`}> {/* Using class from _common.css */}
            {cbData?.friendlyName || session.user.name}
          </h1>
          <p className={styles.discordInfoText}>
            <DiscordIcon className={styles.discordInfoIcon} />
            {session.user.name}
          </p>
          <ThemedRouterButtonLink
            href="/api/auth/signout" // No sx prop, handled by Button component
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
            className={styles.signOutButtonLink} // Apply any layout/spacing via this class
          >
            Sign out
          </ThemedRouterButtonLink>
        </div>
      </div>
    </div>
  );
};

// Main Yourspace component (to be continued)
function Yourspace() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const { data: cbData, error: cbError } = useSWR(loading || !session ? null : "/api/cb/user", {
    refreshInterval: 0,
  });

  const minecraftData = useMinecraftData();
  const vanilla = minecraftData ? minecraftData.vanilla : null;
  const modded = minecraftData ? minecraftData.modded : null;

  if (typeof window !== "undefined" && loading) return null;

  if (!session) {
    return (
      <MainLayout noPadding>
        <FullBox useDims={true} className={styles.signInContainer}>
          <h1 className={styles.signInHeading}>yourspace</h1>
          <p>
            <Button onClick={() => signIn("discord")} variant="discord">Sign in with Discord</Button>
          </p>
        </FullBox>
      </MainLayout>
    );
  }

  if (cbError || cbData?.cb?.p?.v === "X" || cbData?.cb.error) {
    return (
      <MainLayout noPadding>
        <DiscordHeader session={session} cbData={cbData?.cb} /> {/* Pass cbData.cb if that's the structure */}
        <div className={`${styles.oopsContainer} container`}> {/* Using .container from _common.css */}
          <h1 className={styles.oopsHeading}>oops</h1>
          <p className={styles.oopsParagraph}>Either no connections could be found or an error occurred.</p>
          <p className={styles.oopsParagraph}>Ask for the IP from anyone you recognize below</p>
          <div className={styles.oopsImageGrid}>
            <Image width="200px" height="200px" src={CID1} alt="1" layout="fixed" />
            <Image width="200px" height="200px" src={CID2} alt="2" layout="fixed" />
            <Image width="200px" height="200px" src={CID3} alt="3" layout="fixed" />
            <Image width="200px" height="200px" src={CID4} alt="4" layout="fixed" />
            <Image width="200px" height="200px" src={CID5} alt="5" layout="fixed" />
            <Image width="200px" height="200px" src={CID6} alt="6" layout="fixed" />
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!cbData) {
    return <LoadingFullBox text="Checking..." />;
  }

  // PComponent Sub-component (defined inside Yourspace as it's specific and uses Yourspace's scope)
  const PComponent = () => {
    if (!cbData.d) { // cbData.d is the condition from original logic
      if (cbData.cb.p.v === "M") {
        return (
          <div className={styles.pComponentContainer}>
            <div className={styles.pComponentGrid}>
              <p className="text-muted">&#47;&#47; zyfriend not found in the lounge</p>
              <h1><CBOAIcon className={styles.pComponentIcon} /> Hey!</h1>
              <p>Seems it's been a while! Feel free to say hello, I'd love to reconnect! Always nice to see old friends.</p>
              <p>- zy</p>
            </div>
          </div>
        );
      } else if (cbData.cb.p.v === "MJ") {
        return (
          <div className={styles.pComponentContainer}>
            <div className={styles.pComponentGrid}>
              <p className="text-muted">&#47;&#47; user not found in the lounge</p>
              <h1><CBOAIcon className={styles.pComponentIcon} /> Hey!</h1>
              <p>Seems it's been a while! Feel free to say hello, I'd love to reconnect! Always nice to see old friends.</p>
              <p>
                Feel free to join the lounge! It's seasonally active with Minecraft updates. I usually post server updates there and there's a channel that let's you chat
                ingame. <a href={`https://discord.gg/${process.env.NEXT_PUBLIC_DISCORDINVITE}`}>Join here</a> if you'd like!
              </p>
              <p>- zy</p>
            </div>
          </div>
        );
      } else if (cbData.cb.p.v === "J") {
        return (
          <div className={styles.pComponentContainer}>
            <div className={styles.pComponentGrid}>
              <p className="text-muted">&#47;&#47; user not found in the lounge</p>
              <h1><DiscordIcon className={`${styles.pComponentIcon} ${styles.pComponentDiscordIcon}`} /> Hey!</h1>
              <p>
                Feel free to join the lounge! It's seasonally active with Minecraft updates. I usually post server updates there and there's a channel that let's you chat
                ingame. <a href={`https://discord.gg/${process.env.NEXT_PUBLIC_DISCORDINVITE}`}>Join here</a> if you'd like!
              </p>
              <p>- zy</p>
            </div>
          </div>
        );
      } else {
        return <p>what</p>; // Fallback
      }
    }
    return null; // Original logic returned <></> which is effectively null for rendering nothing
  };

  return (
    <MainLayout noPadding>
      <DiscordHeader session={session} cbData={cbData.cb} />
      <div className={`${styles.mainContentContainer} container`}> {/* Using .container from _common.css */}
        <div className={`${styles.indevMessage} message-primary`}> {/* Using .message-primary from _common.css */}
          indev
        </div>
        {cbData && cbData.cb && cbData.cb.p && <PComponent />}
        <hr className={styles.contentDivider} />
        <p className={styles.serverInfoParagraph}>Feel free to join the server at:</p>
        <h1 className={styles.serverIpHeading}>
          {process.env.NEXT_PUBLIC_MCIP}
        </h1>
        <MinecraftStatus data={vanilla} /> {/* ip prop was "???" and not used by MinecraftStatus */}
        <p className={styles.moddedInfoParagraph}>Sometimes we'll have a modded server online. Join that at:</p>
        <h1 className={styles.serverIpHeading}>
          {process.env.NEXT_PUBLIC_MCMODDEDIP}
        </h1>
        <MinecraftStatus data={modded} /> {/* ip prop was "???" and not used by MinecraftStatus */}
      </div>
    </MainLayout>
  );
}

export default Yourspace;
