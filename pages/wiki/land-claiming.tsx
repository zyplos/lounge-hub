import Link from "next/link";
import Head from "next/head";
import MinecraftText from "@/components/MinecraftText/index";
import ArticleLayout from "@/internals/ArticleLayout";

export default function LandClaimingPage() {
  return (
    <ArticleLayout title="Land Claiming">
      <Head>
        <title>Land Claiming • wiki • the lounge hub</title>
      </Head>

      <div className="paragraphMargin textContent">
        <p>
          Chunks in the world can be claimed by players. Typing{" "}
          <MinecraftText>/claim</MinecraftText> will make the chunk you're
          standing in yours. This will be shown on your public profile, so don't
          claim chunks that have things you want to keep secret.
        </p>

        <p>
          People who walk into your owned chunk will be shown a message above
          their hotbar telling that they are walking in someone's territory. It
          will also show in <MinecraftText>/chunkinfo</MinecraftText>.
        </p>

        <p>
          When players walk into a claimed chunk, their visit is recorded. Check
          who recently walked through your claim by doing{" "}
          <MinecraftText>/visitorslog</MinecraftText> Ingame, this will show the
          last 10 visits. You'll have the view the visitor's log online if you
          want to see all visits.
        </p>

        <p>
          Only one person can hold a claim to a chunk. If you no longer need a
          chunk, or claimed the wrong one, you can unclaim it by doing{" "}
          <MinecraftText>/unclaim</MinecraftText>.
        </p>
      </div>

      <div className="paragraphMargin textContent">
        <h2>Player Profiles</h2>

        <p>
          Each player has a profile that is viewable ingame and online. They
          show a player's home coords if they have set one and have it set to
          public. Your profile online shows a bit more detail by listing all the
          chunks the player has claimed.
        </p>

        <p>
          See your own profile by doing <MinecraftText>/profile</MinecraftText>.
          See another player's profile by doing{" "}
          <MinecraftText>/profile [name]</MinecraftText>.
        </p>

        <p>
          More detailed player profiles can be viewed on the{" "}
          <Link href="/mc/player/">player profile page</Link> (example here:{" "}
          <Link href="/mc/player/Zyplos/">Zyplos's profile</Link>
          ).
        </p>
      </div>

      <div className="paragraphMargin textContent">
        <h2>Player Homes</h2>

        <p>
          The server has a <MinecraftText>/sethome</MinecraftText> command that
          will set your player home to the location where you're standing. Doing{" "}
          <MinecraftText>/home</MinecraftText> will not teleport you to your set
          home however. Instead it will send you your home coordinates for you
          to reference. Players are encouraged to create travel systems that
          span the world.
        </p>

        <p>
          The home you set is visible on your public profile by default. If you
          want to hide it, do <MinecraftText>/hidehome</MinecraftText>. If you
          want it to show publicly again, do{" "}
          <MinecraftText>/showhome</MinecraftText>.
        </p>
      </div>
    </ArticleLayout>
  );
}
