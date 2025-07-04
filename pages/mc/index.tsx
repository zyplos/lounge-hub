import Image from "next/image";
import MainLayout from "@/internals/MainLayout";

import styles from "@/styles/MCIndexPage.module.scss";

import InvitationSplashImage from "@/assets/invitation-splash.png";
import EmblemMCImage from "@/assets/emblem-mc.png";

import CID1 from "@/assets/ref/1.png";
import CID2 from "@/assets/ref/2.png";
import CID3 from "@/assets/ref/3.png";
import CID4 from "@/assets/ref/4.png";
import CID5 from "@/assets/ref/5.png";
import CID6 from "@/assets/ref/6.png";
import clsx from "clsx";

export default function MCHomePage() {
  return (
    <MainLayout noPadding={true}>
      <div
        className={clsx(styles.heroSection, "paragraphMargin")}
        style={{ backgroundImage: `url(${InvitationSplashImage.src})` }}
      >
        <Image
          src={EmblemMCImage}
          alt=""
          priority
          className={styles.heroEmblem}
        />

        <div className={styles.heroTextContent}>
          <h1 className={styles.biggerOutlinedText}>the lounge SMP server</h1>
          <p className={styles.outlinedText}>season 6</p>
          <p className={styles.outlinedText}>echoes of the realm</p>
        </div>
      </div>

      <div className={styles.centerStuff}>
        <div className="textContent">
          <p className="bold">check status for current version</p>
          <p>
            lounge mutuals only. ask for the IP from anyone you recognize below!
          </p>
        </div>

        <div className={styles.cbImageGrid}>
          <Image width="200" height="200" src={CID1} alt="" />
          <Image width="200" height="200" src={CID2} alt="" />
          <Image width="200" height="200" src={CID3} alt="" />
          <Image width="200" height="200" src={CID4} alt="" />
          <Image width="200" height="200" src={CID5} alt="" />
          <Image width="200" height="200" src={CID6} alt="" />
        </div>
      </div>
    </MainLayout>
  );
}
