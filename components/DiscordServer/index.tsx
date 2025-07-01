import useSWR, { type SWRResponse } from "swr";
import Image from "next/image";
import { Fullbox } from "../Fullbox";
import Spinner from "../Spinner";
import styles from "./styles.module.scss";
import clsx from "clsx";

// Types for Discord Widget API
interface DiscordGame {
  name: string;
}

type DiscordMemberStatus = "online" | "idle" | "dnd" | "offline" | "streaming";

interface DiscordMember {
  id: string;
  username: string;
  avatar_url: string;
  status: DiscordMemberStatus;
  channel_id?: string;
  game?: DiscordGame;
}

interface DiscordChannel {
  id: string;
  name: string;
  position: number;
}

interface DiscordWidgetData {
  id: string;
  name: string;
  instant_invite: string | null;
  channels: DiscordChannel[];
  members: DiscordMember[];
  presence_count: number;
}

const getStatusClass = (status: DiscordMemberStatus): string => {
  switch (status) {
    case "online":
      return styles.statusOnline;
    case "idle":
      return styles.statusIdle;
    case "dnd":
      return styles.statusDnd;
    default:
      return "";
  }
};

export default function DiscordServer() {
  const { data: discordData, error }: SWRResponse<DiscordWidgetData, any> =
    useSWR(
      "https://canary.discordapp.com/api/guilds/426394718172086273/widget.json"
    );

  if (error) {
    return (
      <>
        <p className="textMuted">
          Oops. Couldn't get the Discord server's status.
        </p>
      </>
    );
  }
  if (!discordData) {
    return (
      <Fullbox useDims={false} usePadding>
        <Spinner title="Loading Discord Status" />
        <p>Loading Discord status.</p>
      </Fullbox>
    );
  }

  const knownBots: string[] = [
    "Metabyte",
    "Buggy",
    "scooter",
    "Sine",
    "Tessie",
    "Maestro",
    "NotSoBot",
    "SoundCloud",
  ];

  const voiceChannelId: string = "426394718591778818";
  const numberInVoice: number = discordData.members.filter(
    (m) => m.channel_id === voiceChannelId
  ).length;

  return (
    <>
      <div className={styles.discordGrid}>
        {/* Voice Channel Static Card */}
        <div className={styles.memberItem}>
          <VoiceChannelIcon />
          <div className={styles.textContainer}>
            <p className={styles.usernameText}>voice</p>
            <p className={styles.statusText}>
              <span className="bold">{numberInVoice}</span> in
              channel.
            </p>
          </div>
        </div>

        {/* Member Cards */}
        {discordData.members.map((member) => (
          <div key={member.id || member.username} className={styles.memberItem}>
            <div
              className={clsx(
                styles.iconWrapper,
                styles.statusBorder,
                getStatusClass(member.status)
              )}
            >
              <Image
                alt={`${member.username}'s profile picture`}
                src={member.avatar_url}
                width={60}
                height={60}
              />
            </div>

            <div className={styles.textContainer}>
              <p className={styles.usernameText}>
                {member.username}
                {knownBots.includes(member.username) && (
                  <span
                    className={styles.botBadge}
                  >
                    Bot
                  </span>
                )}
              </p>
             
              {member.game && (
                <p
                  className={styles.statusText}
                >
                  <span className="bold">Playing</span>{" "}
                  {member.game.name}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      <p className={styles.totalOnlineText}>
        {discordData.members.length} currently online.
      </p>
    </>
  );
}

function VoiceChannelIcon() {
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: decorative
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 60 60"
      className={clsx(styles.voiceIconSvg, styles.iconWrapper)}
    >
      <path className={styles.voiceIconBg} d="M0 0h60v60H0z" />
      <path
        className={styles.voiceIconPath}
        d="M29.8 14.98c-.63-.26-1.35-.12-1.83.37l-7.23 7.92h-5.05c-.93 0-1.68.76-1.68 1.68v10.1c0 .93.76 1.68 1.68 1.68h5.05l7.23 7.92c.48.48 1.21.63 1.83.37a1.69 1.69 0 0 0 1.04-1.56V16.53c0-.68-.41-1.3-1.04-1.55Zm4.4 3.24v3.37c4.64 0 8.42 3.78 8.42 8.42s-3.78 8.42-8.42 8.42v3.37c6.5 0 11.78-5.28 11.78-11.78S40.69 18.24 34.2 18.24Zm0 6.73c2.78 0 5.05 2.27 5.05 5.05s-2.27 5.05-5.05 5.05v-3.37c.93 0 1.68-.76 1.68-1.68s-.76-1.68-1.68-1.68v-3.37Z"
      />
    </svg>
  );
}
