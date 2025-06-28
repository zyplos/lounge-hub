import type { NextApiRequest, NextApiResponse } from "next";
import {
  status,
  JavaStatusResponse,
  JavaStatusOptions,
} from "minecraft-server-util";

// Define the expected structure of the response for each server
// This could be JavaStatusResponse or a string if an error occurred
type ServerStatusResult = JavaStatusResponse | string;

interface ApiStatusResponse {
  vanilla: ServerStatusResult;
  modded: ServerStatusResult;
}

const statusOptions: JavaStatusOptions = {
  enableSRV: true,
  timeout: 7000,
};

// Helper function to get server data
const getServerData = async (ip: string): Promise<JavaStatusResponse> => {
  if (!ip) {
    throw new Error("Server IP address is not defined.");
  }
  // The second argument for port is optional and can be undefined for default
  return status(ip, undefined, statusOptions);
};

export default async function handler(
  _req: NextApiRequest, // _req is unused
  res: NextApiResponse<ApiStatusResponse>
) {
  const vanillaIp = process.env.NEXT_PUBLIC_MCIP as string;
  const moddedIp = process.env.NEXT_PUBLIC_MCMODDEDIP as string;

  const vanillaPromise = getServerData(vanillaIp).catch(
    (e) => e.message || "Failed to fetch vanilla server status"
  );
  const moddedPromise = getServerData(moddedIp).catch(
    (e) => e.message || "Failed to fetch modded server status"
  );

  const results = await Promise.allSettled([vanillaPromise, moddedPromise]);

  const vanillaResult: ServerStatusResult =
    results[0].status === "fulfilled" ? results[0].value : results[0].reason;
  const moddedResult: ServerStatusResult =
    results[1].status === "fulfilled" ? results[1].value : results[1].reason;

  res.status(200).json({
    vanilla: vanillaResult,
    modded: moddedResult,
  });
}
