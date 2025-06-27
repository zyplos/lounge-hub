import React from "react";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import InvitationSplashImage from "../../assets/invitation-splash.png";
import EmblemMCImage from "../../assets/emblem-mc.png";
import ChunkClaimImage from "../../assets/chunk-claim.png";
import CloudsMiscImage from "../../assets/clouds-misc.png";
import WorldgenPackImage from "../../assets/worldgen-pack.png";
import MainLayout from "../../internals/MainLayout";
import Yourspace from "../../components/Yourspace";
import CID1 from "../../assets/ref/1.png";
import CID2 from "../../assets/ref/2.png";
import CID3 from "../../assets/ref/3.png";
import CID4 from "../../assets/ref/4.png";
import CID5 from "../../assets/ref/5.png";
import CID6 from "../../assets/ref/6.png";
import styles from "./styles.module.css";

function ModifiedH2({ children }) {
  return <h2 className={styles.modifiedH2}>{children}</h2>;
}

function SectionBox({ heading, image, children, isAlt }) {
  return (
    <div className={styles.sectionBox + (isAlt ? ' ' + styles.sectionBoxAlt : '')} style={{ backgroundImage: `url(${image.src})` }}>
      <div className={styles.sectionContent}>
        <h2 className={styles.sectionHeading}>{heading}</h2>
        {children}
      </div>
    </div>
  );
}

function CenterSectionBox({ children }) {
  return (
    <div className={styles.centerSectionBox}>
      <div className={styles.centerSectionContent}>{children}</div>
    </div>
  );
}

function SignInButton() {
  return (
    <button className={styles.signInButton} onClick={() => signIn("discord", { callbackUrl: "/mc" })}>
      Sign in with Discord
    </button>
  );
}

const singlePixelShadow = "1px 1px 0px black, -1px 1px 0px black, -1px -1px 0px black ,1px -1px 0px black";

function MCHomeNotSignedIn() {
  return (
    <MainLayout noPadding>
      <div className={styles.notSignedInRoot}>
        <div className={styles.heroSection} style={{ backgroundImage: `url(${InvitationSplashImage.src})` }}>
          <div className={styles.heroEmblemWrapper}>
            <Image src={EmblemMCImage} alt="Emblem MC" layout="responsive" priority />
          </div>
          <div className={styles.heroTextBlock}>
            <h1 className={styles.heroTitle}>the lounge SMP server</h1>
            <div className={styles.heroSeason} style={{ textShadow: singlePixelShadow }}>season 6</div>
            <div className={styles.heroSubtitle} style={{ textShadow: singlePixelShadow }}>echoes of the realm</div>
            <div className={styles.heroSignIn}><SignInButton /></div>
            <div className={styles.heroScroll} style={{ textShadow: singlePixelShadow }}>scroll down!</div>
          </div>
        </div>
        <CenterSectionBox>
          <ModifiedH2>latest vanilla release</ModifiedH2>
          <div className={styles.paragraph}>lounge mutuals only. Sign in to see if you're on the allowlist.</div>
          <SignInButton />
          <div className={styles.paragraph}>Or ask for the IP from anyone you recognize below!</div>
          <div className={styles.imageGrid}>
            <Image width={200} height={200} src={CID1} alt="1" />
            <Image width={200} height={200} src={CID2} alt="2" />
            <Image width={200} height={200} src={CID3} alt="3" />
            <Image width={200} height={200} src={CID4} alt="4" />
            <Image width={200} height={200} src={CID5} alt="5" />
            <Image width={200} height={200} src={CID6} alt="6" />
          </div>
        </CenterSectionBox>
      </div>
    </MainLayout>
  );
}

function MCHome() {
  const { data: session } = useSession();
  if (session) {
    return <Yourspace />;
  } else {
    return <MCHomeNotSignedIn />;
  }
}

export default MCHome;
