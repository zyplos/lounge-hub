import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react'; // Import Session
import Image, { StaticImageData } from 'next/image'; // Import StaticImageData
import MainLayout from '../../internals/MainLayout';
import LoadingFullBox from '../LoadingFullBox/index';
import DiscordIcon from '../../assets/discord-icon.svg'; // SVG as ReactComponent
import CBOAIcon from '../../assets/cbOA-icon.svg';   // SVG as ReactComponent
import useSWR, { SWRResponse } from 'swr'; // Import SWRResponse
import { useMinecraftData, MinecraftDataContextState } from '../../internals/MinecraftContext';
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

// Interfaces based on /api/cb/user and NextAuth session
// (Matches CBProfileData and discord-api-types/v10 RESTGetAPIGuildMemberResult from api/cb/user.ts)
interface CBProfilePField {
  v: string; // e.g., "M", "MJ", "J", "X"
  // other fields from 'p' if any
}
interface CBProfilePayload {
  friendlyName?: string;
  hex?: string; // color hex
  p?: CBProfilePField; // 'p' field from cbData
  error?: string;
  // Add other known properties from the 'cb' part of the API response
  [key: string]: any;
}
interface DiscordAPIMemberData {
  // Define based on RESTGetAPIGuildMemberResult or relevant parts
  // This is cbData.d from the API
  nick?: string | null;
  roles?: string[];
  joined_at?: string | null;
  // ... other properties from Discord API
  [key: string]: any;
}
interface UserCBData {
  cb: CBProfilePayload;
  d: DiscordAPIMemberData | { error: string } | null;
}

// --- DiscordHeader Sub-component ---
interface DiscordHeaderProps {
  session: any; // From next-auth
  cbData?: CBProfilePayload | null; // The 'cb' part of UserCBData
}

const DiscordHeader: React.FC<DiscordHeaderProps> = ({ session, cbData }) => {
  // TODO: Augment next-auth Session['user'] type to include 'banner' and 'id'
  // For now, using 'as any' or optional chaining for non-standard props on session.user
  const bannerUrl = (session.user as any)?.banner || InvitationSplashImage.src;

  const headerStyle: React.CSSProperties = {
    backgroundImage: `url(${bannerUrl})`,
  };
  const profileImageBorderStyle: React.CSSProperties = {
    border: `14px solid ${cbData?.hex || "#111111"}`, // Ensure fallback is valid hex
  };

  return (
    <div className={styles.discordHeader} style={headerStyle}>
      <div className={styles.discordHeaderOverlay} />
      <div className={styles.discordHeaderContent}>
        <div className={styles.profileImageContainer}>
          {session.user?.image && (
            <Image
              src={session.user.image} // image is standard on session.user
              alt={`${session.user.name || 'User'}'s profile picture`}
              width={200} // Use numbers
              height={200} // Use numbers
              layout="fixed"
              priority
              style={profileImageBorderStyle}
              className={styles.profileImage}
            />
          )}
        </div>
        <div className={styles.userInfoGrid}>
          <h1 className={`${styles.usernameHeading} text-display2`}>
            {cbData?.friendlyName || session.user?.name || 'User'}
          </h1>
          {session.user?.name && (
            <p className={styles.discordInfoText}>
              <DiscordIcon className={styles.discordInfoIcon} />
              {session.user.name}
            </p>
          )}
          <ThemedRouterButtonLink
            href="/api/auth/signout"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              signOut();
            }}
            className={styles.signOutButtonLink}
          >
            Sign out
          </ThemedRouterButtonLink>
        </div>
      </div>
    </div>
  );
};

// --- Main Yourspace component ---
const Yourspace: React.FC = () => { // Typed as React.FC
  const { data: session, status } = useSession();
  const loading = status === "loading";

  // Type SWR response
  const { data: cbData, error: cbError }: SWRResponse<UserCBData, any> = useSWR(
    loading || !session ? null : "/api/cb/user",
    { refreshInterval: 0 }
  );

  const minecraftData: MinecraftDataContextState | null = useMinecraftData();
  // Ensure ServerStatusData is compatible with what MinecraftStatus expects
  const vanilla = minecraftData?.vanilla || null;
  const modded = minecraftData?.modded || null;

  // This check is usually for client-side only rendering during loading to avoid SSR/hydration issues
  // if (typeof window !== "undefined" && loading) return null;
  // A more common pattern for loading state with NextAuth.js:
  if (loading) {
    return <LoadingFullBox text="Authenticating..." />;
  }

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

  // Session exists, now check cbData states
  if (cbError) {
    // console.error("Error fetching cbData:", cbError);
    // Render some error state, possibly with DiscordHeader if session is available
    return (
      <MainLayout noPadding>
        <DiscordHeader session={session} cbData={null} /> {/* Pass null or a default cbData structure */}
        <div className={`${styles.oopsContainer} container`}>
          <h1 className={styles.oopsHeading}>oops</h1>
          <p className={styles.oopsParagraph}>Could not load yourspace details due to an error.</p>
        </div>
      </MainLayout>
    );
  }

  // Specific error condition from cbData itself or "X" value
  if (cbData?.cb?.error || cbData?.cb?.p?.v === "X") {
    return (
      <MainLayout noPadding>
        <DiscordHeader session={session} cbData={cbData?.cb} />
        <div className={`${styles.oopsContainer} container`}>
          <h1 className={styles.oopsHeading}>oops</h1>
          <p className={styles.oopsParagraph}>Either no connections could be found or an error occurred.</p>
          <p className={styles.oopsParagraph}>Ask for the IP from anyone you recognize below</p>
          <div className={styles.oopsImageGrid}>
            <Image width={200} height={200} src={CID1} alt="1" layout="fixed" />
            <Image width={200} height={200} src={CID2} alt="2" layout="fixed" />
            <Image width={200} height={200} src={CID3} alt="3" layout="fixed" />
            <Image width={200} height={200} src={CID4} alt="4" layout="fixed" />
            <Image width={200} height={200} src={CID5} alt="5" layout="fixed" />
            <Image width={200} height={200} src={CID6} alt="6" layout="fixed" />
          </div>
        </div>
      </MainLayout>
    );
  }

  // If session exists but cbData is still loading (SWR hasn't returned data yet)
  if (!cbData) {
    return (
      <MainLayout noPadding>
        <DiscordHeader session={session} cbData={null} /> {/* Or some loading state for cbData */}
        <LoadingFullBox text="Loading yourspace details..." />
      </MainLayout>
    );
  }

  // PComponent Sub-component
  const PComponent: React.FC = () => {
    // cbData is guaranteed to exist here
    if (!cbData.d) { // cbData.d is the Discord member data
      if (cbData.cb.p?.v === "M") {
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
      } else if (cbData.cb.p?.v === "MJ") {
        return (
          <div className={styles.pComponentContainer}>
            <div className={styles.pComponentGrid}>
              <p className="text-muted">&#47;&#47; user not found in the lounge</p>
              <h1><CBOAIcon className={styles.pComponentIcon} /> Hey!</h1>
              <p>Seems it's been a while! Feel free to say hello, I'd love to reconnect! Always nice to see old friends.</p>
              <p>
                Feel free to join the lounge! It's seasonally active with Minecraft updates. I usually post server updates there and there's a channel that let's you chat
                ingame. <a href={`https://discord.gg/${process.env.NEXT_PUBLIC_DISCORDINVITE as string}`}>Join here</a> if you'd like!
              </p>
              <p>- zy</p>
            </div>
          </div>
        );
      } else if (cbData.cb.p?.v === "J") {
        return (
          <div className={styles.pComponentContainer}>
            <div className={styles.pComponentGrid}>
              <p className="text-muted">&#47;&#47; user not found in the lounge</p>
              <h1><DiscordIcon className={`${styles.pComponentIcon} ${styles.pComponentDiscordIcon}`} /> Hey!</h1>
              <p>
                Feel free to join the lounge! It's seasonally active with Minecraft updates. I usually post server updates there and there's a channel that let's you chat
                ingame. <a href={`https://discord.gg/${process.env.NEXT_PUBLIC_DISCORDINVITE as string}`}>Join here</a> if you'd like!
              </p>
              <p>- zy</p>
            </div>
          </div>
        );
      } else {
        // Fallback for unknown cbData.cb.p.v if needed, or render nothing
        return <p>Unexpected value for p.v: {cbData.cb.p?.v}</p>;
      }
    }
    return null;
  };

  return (
    <MainLayout noPadding>
      <DiscordHeader session={session} cbData={cbData.cb} />
      <div className={`${styles.mainContentContainer} container`}>
        <div className={`${styles.indevMessage} message-primary`}>
          indev
        </div>
        {/* Render PComponent only if cbData.cb.p exists */}
        {cbData.cb.p && <PComponent />}
        <hr className={styles.contentDivider} />
        <p className={styles.serverInfoParagraph}>Feel free to join the server at:</p>
        <h1 className={styles.serverIpHeading}>
          {process.env.NEXT_PUBLIC_MCIP as string}
        </h1>
        <MinecraftStatus data={vanilla} />
        <p className={styles.moddedInfoParagraph}>Sometimes we'll have a modded server online. Join that at:</p>
        <h1 className={styles.serverIpHeading}>
          {process.env.NEXT_PUBLIC_MCMODDEDIP as string}
        </h1>
        <MinecraftStatus data={modded} />
      </div>
    </MainLayout>
  );
};

export default Yourspace;
