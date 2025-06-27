import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import MainLayout from "../../../internals/MainLayout";
import FullBox from "../../../components/FullBox";
import styles from "./styles.module.css";

function IndexPlayer() {
  const [playerName, setPlayerName] = useState("");
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push("/mc/player/" + playerName);
  };

  return (
    <MainLayout noPadding>
      <FullBox useDims={true}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.grid}>
            <div className={styles.muted}>TODO: make this look better</div>
            <h1 className={styles.heading}>Player Lookup</h1>
            {router.query.notfound && <div className={styles.alert}>Player not found.</div>}
            <label className={styles.label}>
              Player Name: <input name="playerName" type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)} required className={styles.input} />
            </label>
            <button className={styles.button}>View Profile</button>
          </div>
        </form>
      </FullBox>
    </MainLayout>
  );
}

export default IndexPlayer;
