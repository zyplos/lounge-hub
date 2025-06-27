import { getSession, Session } from "next-auth/react";
import { getProfileData } from "../../../../firebase/fetchData";
import { REST } from "@discordjs/rest";
import { Routes, RESTGetAPIGuildMemberResult } from "discord-api-types/rest/v10";
import type { NextApiRequest, NextApiResponse } from "next";

// Define a placeholder type for the profile data from Firebase
// Replace this with the actual type structure if known
interface CBProfileData {
  // Define the properties of your profile data
  // For example:
  // name?: string;
  // score?: number;
  error?: string;
  [key: string]: any; // Allow other properties
}

interface ApiResponseData {
  cb: CBProfileData | { error: string };
  d: RESTGetAPIGuildMemberResult | { error: string } | null;
}

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_BOT_TOKEN as string);

async function UserCB(req: NextApiRequest, res: NextApiResponse<ApiResponseData>) {
  let cbProfile: CBProfileData | { error: string } | null = null;
  let session: Session | null = null;

  try {
    session = await getSession({ req });
    if (!session || !session.user || !(session.user as any).id) { // Type assertion for id
      res.status(401).json({ cb: { error: "Unauthorized or session invalid" }, d: { error: "Unauthorized" } });
      return;
    }
    // Assuming session.user.id is string after next-auth.d.ts augmentation
    const userId = (session.user as any).id as string;
    cbProfile = (await getProfileData(userId)) || { error: "no data" };

  } catch (error: any) {
    console.error("Error getting session or cbData in api/cb/user:", error);
    res.status(500).json({ cb: { error: "Session or Firebase data retrieval failed" }, d: { error: "Initial data retrieval failed" } });
    return; // Important to return after sending response
  }

  // If cbProfile is null here, it means getProfileData failed silently or session was invalid earlier.
  // The previous block should handle returning an error response.
  // This check is a safeguard.
  if (!cbProfile || !session || !(session.user as any).id) {
     console.error("api/cb/user: cbProfile or session is unexpectedly null after initial block.");
     // This case should ideally be caught by the previous error handling
     if (!res.headersSent) {
        res.status(500).json({ cb: { error: "Internal error: data not loaded" }, d: { error: "Internal error" } });
     }
     return;
  }
  const userId = (session.user as any).id as string;


  try {
    const dresult = await rest.get(
      Routes.guildMember(process.env.DISCORD_LOUNGE_GUILD_ID as string, userId)
    ) as RESTGetAPIGuildMemberResult;

    res.status(200).json({ cb: cbProfile, d: dresult });
  } catch (error: any) {
    // Discord API error for "Unknown Member"
    if (error.code === 10007) {
      res.status(200).json({ cb: cbProfile, d: null });
    } else {
      console.error("Error checking user in guild (api/cb/user):", error);
      res.status(500).json({ cb: cbProfile, d: { error: "Discord guild check failed" } });
    }
  }
}

export default UserCB;
