import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import MainLayout from "../internals/MainLayout";
import LoadingFullBox from "./LoadingFullBox";
import DiscordIcon from "../assets/discord-icon.svg";
import CBOAIcon from "../assets/cbOA-icon.svg";
import useSWR from "swr";
import { useMinecraftData } from "../internals/MinecraftContext";
import MinecraftStatus from "./MinecraftStatus";
import CID1 from "../assets/ref/1.png";
import CID2 from "../assets/ref/2.png";
import CID3 from "../assets/ref/3.png";
import CID4 from "../assets/ref/4.png";
import CID5 from "../assets/ref/5.png";
import CID6 from "../assets/ref/6.png";
import InvitationSplashImage from "../assets/invitation-splash.png";
import ThemedRouterButtonLink from "./ThemedRouterButtonLink";
import FullBox from "./FullBox";
import styles from "./Yourspace.module.css";

function DiscordHeader({ session, cbData }) {
  return (
    <div className={styles.discordHeader} style={{ backgroundImage: `url(${session.user.banner || InvitationSplashImage.src})` }}>
      <div className={styles.discordHeaderOverlay} />
      <div className={styles.discordHeaderContent}>
        <div className={styles.discordHeaderImageWrapper}>
          <Image src={session.user.image} alt={"your profile picture"} width={200} height={200} />
        </div>
        <div className={styles.discordHeaderTextCol}>
          <h1 className={styles.display2}>{cbData?.friendlyName || session.user.name}</h1>
          <div className={styles.discordNameRow}>
            <DiscordIcon className={styles.discordIcon} />
            <span>{session.user.name}</span>
          </div>
          <ThemedRouterButtonLink
            href={"/api/auth/signout"}
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
            className={styles.signOutBtn}
          >
            Sign out
          </ThemedRouterButtonLink>
        </div>
      </div>
    </div>
  );
}

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
        <FullBox useDims={true}>
          <h1 className={styles.display2}>yourspace</h1>
          <p>
            <button className={styles.signInBtn} onClick={() => signIn("discord")}>Sign in with Discord</button>
          </p>
        </FullBox>
      </MainLayout>
    );
  }

  if (cbError || cbData?.cb?.p?.v === "X" || cbData?.cb.error) {
    return (
      <MainLayout noPadding>
        <DiscordHeader session={session} cbData={cbData.cb} />
        <div className={styles.container}>
          <h1 className={styles.display2}>oops</h1>
          <p>Either no connections could be found or an error occurred.</p>
          <p>Ask for the IP from anyone you recognize below</p>
          <div className={styles.gridImages}>
            <Image width={200} height={200} src={CID1} alt="1" />
            <Image width={200} height={200} src={CID2} alt="2" />
            <Image width={200} height={200} src={CID3} alt="3" />
            <Image width={200} height={200} src={CID4} alt="4" />
            <Image width={200} height={200} src={CID5} alt="5" />
            <Image width={200} height={200} src={CID6} alt="6" />
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!cbData) {
    return <LoadingFullBox text="Checking..." />;
  }

  function PComponent() {
    if (!cbData.d) {
      if (cbData.cb.p.v === "M") {
        return (
          <div className={styles.pComponentGrid}>
            <span className={styles.muted}>&#47;&#47; zyfriend not found in the lounge</span>
            <h1 className={styles.display2}><CBOAIcon className={styles.cboaIcon} /> Hey!</h1>
            <p>Seems it's been a while! Feel free to say hello, I'd love to reconnect! Always nice to see old friends.</p>
            <span className={styles.muted}>- zy</span>
          </div>
        );
      } else if (cbData.cb.p.v === "MJ") {
        return (
          <div className={styles.pComponentGrid}>
            <span className={styles.muted}>&#47;&#47; user not found in the lounge</span>
            <h1 className={styles.display2}><CBOAIcon className={styles.cboaIcon} /> Hey!</h1>
            <p>Seems it's been a while! Feel free to say hello, I'd love to reconnect! Always nice to see old friends.</p>
            <p>
              Feel free to join the lounge! It's seasonally active with Minecraft updates. I usually post server updates there and there's a channel that let's you chat
              ingame. <a href={`https://discord.gg/${process.env.NEXT_PUBLIC_DISCORDINVITE}`}>Join here</a> if you'd like!
            </p>
            <span className={styles.muted}>- zy</span>
          </div>
        );
      } else if (cbData.cb.p.v === "J") {
        return (
          <div className={styles.pComponentGrid}>
            <span className={styles.muted}>&#47;&#47; user not found in the lounge</span>
            <h1 className={styles.display2}><DiscordIcon className={styles.discordIcon} /> Hey!</h1>
            <p>
              Feel free to join the lounge! It's seasonally active with Minecraft updates. I usually post server updates there and there's a channel that let's you chat
              ingame. <a href={`https://discord.gg/${process.env.NEXT_PUBLIC_DISCORDINVITE}`}>Join here</a> if you'd like!
            </p>
            <span className={styles.muted}>- zy</span>
          </div>
        );
      } else {
        return <p>what</p>;
      }
    } else {
      return <></>;
    }
  }

  return (
    <MainLayout noPadding>
      <DiscordHeader session={session} cbData={cbData.cb} />
      <div className={styles.container}>
        <div className={styles.messagePrimary}>indev</div>
        {cbData && cbData.cb.p && <PComponent />}
        <hr className={styles.divider} />
        <p>Feel free to join the server at:</p>
        <h1 className={styles.display2}>{process.env.NEXT_PUBLIC_MCIP}</h1>
        <MinecraftStatus data={vanilla} ip="???" />
        <p className={styles.mt5}>Sometimes we'll have a modded server online. Join that at:</p>
        <h1 className={styles.display2}>{process.env.NEXT_PUBLIC_MCMODDEDIP}</h1>
        <MinecraftStatus data={modded} ip="???" />
      </div>
    </MainLayout>
  );
}

export default Yourspace;
