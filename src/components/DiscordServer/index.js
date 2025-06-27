import React from "react";
import useSWR from "swr";
import Image from "next/image";
import FullBox from "../FullBox";
import Spinner from "../Spinner";
import styles from "./DiscordServer.module.css";

function DiscordServer() {
  const { data: discordData, error } = useSWR("https://canary.discordapp.com/api/guilds/426394718172086273/widget.json");
  if (error) {
    return (
      <FullBox>
        <div className={styles.error}>Error getting Discord status.</div>
        <pre>{JSON.stringify(error, false, 1)}</pre>
      </FullBox>
    );
  }
  if (!discordData) {
    return (
      <FullBox>
        <Spinner title="Loading Discord Status" size={200} />
        Loading Discord status.
      </FullBox>
    );
  }
  const knownBots = ["Metabyte", "Buggy", "scooter", "Sine", "Tessie", "Maestro", "Rythm", "NotSoBot", "ProBot", "SoundCloud"];
  const voiceChannelId = "426394718591778818";
  const voiceChannel = discordData.channels.find((channel) => channel.id === voiceChannelId);
  const numberInVoice = discordData.members.filter((m) => m.channel_id == voiceChannelId).length;

  return (
    <div className={styles.grid}>
      <div className={styles.voiceRow}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" className={styles.voiceIcon}>
          <path style={{ fill: "#5865f2" }} d="M0 0h60v60H0z" />
          <path d="M29.8 14.98c-.63-.26-1.35-.12-1.83.37l-7.23 7.92h-5.05c-.93 0-1.68.76-1.68 1.68v10.1c0 .93.76 1.68 1.68 1.68h5.05l7.23 7.92c.48.48 1.21.63 1.83.37a1.69 1.69 0 0 0 1.04-1.56V16.53c0-.68-.41-1.3-1.04-1.55Zm4.4 3.24v3.37c4.64 0 8.42 3.78 8.42 8.42s-3.78 8.42-8.42 8.42v3.37c6.5 0 11.78-5.28 11.78-11.78S40.69 18.24 34.2 18.24Zm0 6.73c2.78 0 5.05 2.27 5.05 5.05s-2.27 5.05-5.05 5.05v-3.37c.93 0 1.68-.76 1.68-1.68s-.76-1.68-1.68-1.68v-3.37Z" style={{ fill: "#fff" }} />
        </svg>
        <div className={styles.voiceInfoCol}>
          <div className={styles.voiceLabel}>voice</div>
          <div className={styles.voiceCount}><span className={styles.bold}>{numberInVoice}</span> in channel.</div>
        </div>
      </div>
      {discordData.members.map((member, index) => {
        return (
          <div key={index} className={styles.memberRow + (member.status === "streaming" ? ' ' + styles.streaming : '')}>
            <div className={styles.memberIcon + ' ' + styles[member.status]}>
              <Image alt="profile" src={member.avatar_url} width={60} height={60} />
            </div>
            <div className={styles.memberInfoCol}>
              <div className={styles.memberName}>
                {member.username}
                {knownBots.includes(member.username) && (
                  <span className={styles.botBadge}>Bot</span>
                )}
              </div>
              {member.status === "streaming" && (
                <span className={styles.live}>Live on Twitch!</span>
              )}
              {member.game && (
                <div className={styles.memberGame}>
                  <span className={styles.bold}>Playing</span> {member.game.name}
                </div>
              )}
            </div>
          </div>
        );
      })}
      <div className={styles.muted}>{discordData.members.length} currently online.</div>
    </div>
  );
}

export default DiscordServer;
