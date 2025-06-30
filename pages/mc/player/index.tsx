import { useRouter } from "next/router";
import { useState } from "react";
// Link is not used in this component
import MainLayout from "../../../internals/MainLayout";
import { Fullbox } from "@/components/Fullbox";
import Button from "../../../components/Button/index"; // Custom Button
import Alert from "../../../components/Alert/index"; // Custom Alert
import styles from "../../../styles/PlayerIndexPage.module.css"; // Adjusted path

function PlayerIndexPage() {
  // Renamed component
  const [playerName, setPlayerName] = useState("");
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (playerName.trim()) {
      // Ensure playerName is not just whitespace
      router.push("/mc/player/" + playerName.trim());
    }
  };

  return (
    <MainLayout noPadding>
      <Fullbox useDims={true}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <p className={`${styles.todoText} text-muted`}>
              TODO: make this look better
            </p>
            <h1 className={styles.pageHeading}>Player Lookup</h1>

            {router.query.notfound && (
              <Alert variant="error" className={styles.notFoundAlert}>
                Player not found.
              </Alert>
            )}
            <label className={styles.formLabel}>
              Player Name:
              <input
                className={styles.formInput}
                name="playerName"
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                required
              />
            </label>

            <Button type="submit">View Profile</Button>
          </div>
        </form>
      </Fullbox>
    </MainLayout>
  );
}

export default PlayerIndexPage;
