import React from 'react';
import useSWR, { SWRResponse } from 'swr'; // Import SWRResponse for typing
import Image from 'next/image';
import FullBox from '../FullBox/index';
import Spinner from '../Spinner/index';
// Alert component might be needed if error display changes from preformatted text
// import Alert from '../Alert/index';
import styles from './styles.module.css';

// Types for Discord Widget API
interface DiscordGame {
  name: string;
}

type DiscordMemberStatus = 'online' | 'idle' | 'dnd' | 'offline' | 'streaming';

interface DiscordMember {
  id: string;
  username: string;
  avatar_url: string;
  status: DiscordMemberStatus;
  channel_id?: string; // Optional, as not all members might be in a voice channel
  game?: DiscordGame;
  // deaf?: boolean; // Example of other potential properties
  // mute?: boolean; // Example of other potential properties
}

interface DiscordChannel {
  id: string;
  name: string;
  position: number;
  // Add other channel properties if needed
}

interface DiscordWidgetData {
  id: string;
  name: string;
  instant_invite: string | null;
  channels: DiscordChannel[];
  members: DiscordMember[];
  presence_count: number;
}

// Local VoiceChannelIcon component
const VoiceChannelIcon: React.FC = () => ( // Typed as React.FC
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" className={styles.voiceIconSvg}>
    <path
      className={styles.voiceIconPath1}
      d="M0 0h60v60H0z"
    />
    <path
      className={styles.voiceIconPath2}
      d="M29.8 14.98c-.63-.26-1.35-.12-1.83.37l-7.23 7.92h-5.05c-.93 0-1.68.76-1.68 1.68v10.1c0 .93.76 1.68 1.68 1.68h5.05l7.23 7.92c.48.48 1.21.63 1.83.37a1.69 1.69 0 0 0 1.04-1.56V16.53c0-.68-.41-1.3-1.04-1.55Zm4.4 3.24v3.37c4.64 0 8.42 3.78 8.42 8.42s-3.78 8.42-8.42 8.42v3.37c6.5 0 11.78-5.28 11.78-11.78S40.69 18.24 34.2 18.24Zm0 6.73c2.78 0 5.05 2.27 5.05 5.05s-2.27 5.05-5.05 5.05v-3.37c.93 0 1.68-.76 1.68-1.68s-.76-1.68-1.68-1.68v-3.37Z"
    />
  </svg>
);

const DiscordServer: React.FC = () => { // Typed as React.FC
  const { data: discordData, error }: SWRResponse<DiscordWidgetData, any> = useSWR(
    "https://canary.discordapp.com/api/guilds/426394718172086273/widget.json"
  );

  if (error) {
    return (
      <FullBox useDims={false} usePadding>
        <p className="text-fullbox">Error getting Discord status.</p>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </FullBox>
    );
  }
  if (!discordData) {
    return (
      <FullBox useDims={false} usePadding>
        <Spinner title="Loading Discord Status" />
        <p style={{ marginTop: 'var(--space-2)' }}>Loading Discord status.</p>
      </FullBox>
    );
  }

  const knownBots: string[] = ["Metabyte", "Buggy", "scooter", "Sine", "Tessie", "Maestro", "Rythm", "NotSoBot", "ProBot", "SoundCloud"];
  const voiceChannelId: string = "426394718591778818";
  // const voiceChannel = discordData.channels.find((channel) => channel.id === voiceChannelId);
  const numberInVoice: number = discordData.members.filter((m) => m.channel_id === voiceChannelId).length;
  // console.log(discordData);

  const getStatusClass = (status: DiscordMemberStatus): string => {
    switch (status) {
      case 'online':
        return styles.statusOnline;
      case 'idle':
        return styles.statusIdle;
      case 'dnd':
        return styles.statusDnd;
      case 'streaming': // Streaming has a specific border for the avatar, but also a background for the flex container
        return styles.statusStreaming;
      default:
        return '';
    }
  };

  return (
    <React.Fragment>
      <div className={styles.discordGrid}>
        {/* Voice Channel Static Card */}
        <div className={styles.memberFlex}>
          <VoiceChannelIcon />
          <div className={styles.textContainer}>
            <p className={styles.usernameText}>voice</p>
            <p className={styles.statusText}>
              <span className={styles.statusTextBold}>{numberInVoice}</span> in channel.
            </p>
          </div>
        </div>

        {/* Member Cards */}
        {discordData.members.map((member) => (
          <div
            key={member.id || member.username} // Use member.id if available and unique
            className={`${styles.memberFlex} ${member.status === 'streaming' ? styles.memberFlexStreaming : ''}`}
          >
            <div className={`${styles.iconWrapperBase} ${getStatusClass(member.status)}`}>
              <Image alt={`${member.username}'s avatar`} layout="fixed" src={member.avatar_url} width={60} height={60} />
            </div>
            <div className={styles.textContainer}>
              <p className={styles.usernameText}>
                {member.username}
                {knownBots.includes(member.username) && (
                  <span className={`badge-discord ${styles.botBadge}`} style={{marginLeft: 'var(--space-2)'}}>
                    Bot
                  </span>
                )}
              </p>
              {member.status === 'streaming' && member.game && ( // Twitch game takes precedence for display
                <p className={`${styles.statusText} ${styles.statusTextStreaming} ${styles.statusTextBold}`}>
                  Live on Twitch!
                </p>
              )}
              {member.game && (
                <p className={`${styles.statusText} ${member.status === 'streaming' ? styles.statusTextStreaming : ''}`}>
                  <span className={styles.statusTextBold}>Playing</span> {member.game.name}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      <p className={styles.totalOnlineText}>{discordData.members.length} currently online.</p>
    </React.Fragment>
  );
}

export default DiscordServer;
