import type { NextApiRequest, NextApiResponse } from "next";
import { ping } from "minecraft-server-ping"; // This lib is old, may not have types
// import * as motdparser from "mcmotdparser"; // Also old, types unlikely

// Basic interface for the component structure used in backupMOTDParser
interface MotdComponent {
  text: string;
  extra?: MotdComponent[];
  [key: string]: any; // Allow other properties from the MOTD format
}

// Basic interface for the expected response from minecraft-server-ping
// This is a guess based on common ping response structures. Adjust if needed.
interface PingResponse {
  version: {
    name: string; // e.g., "1.19.4"
    protocol: number;
  };
  players: {
    max: number;
    online: number;
    sample?: Array<{ id: string; name: string }>;
  };
  description: {
    text: string; // Raw MOTD text
    extra?: MotdComponent[]; // For complex MOTDs
    html?: string; // If parsed
  };
  favicon?: string; // Base64 encoded image
  [key: string]: any; // Allow other properties
}

type ServerPingResult = PingResponse | { error: string };

interface ApiPingStatusResponse {
  vanilla: ServerPingResult;
  modded: ServerPingResult;
}

// function backupMOTDParser(componentArray: MotdComponent[]): string {
//   let output = "";
//   componentArray.forEach((component) => {
//     output += component.text;
//     if (component.extra) {
//       output += backupMOTDParser(component.extra);
//     }
//   });
//   return output;
// }

export default async function handler(
  req: NextApiRequest, // req is unused but part of NextApiHandler
  res: NextApiResponse<ApiPingStatusResponse>
) {
  const getServerData = async (ip: string, port: number): Promise<ServerPingResult> => {
    if (!ip) {
        return { error: "Server IP address is not defined." };
    }
    try {
      // minecraft-server-ping's ping function is likely promisified if it's from a 'const { ping } = require'
      // It might not be strictly typed, so we cast the result.
      const response = await ping(ip, port) as PingResponse; // Type assertion

      // The commented out MOTD parsing logic:
      // if (response.description && response.description.extra && response.description.text === "") {
      //   response.description.text = backupMOTDParser(response.description.extra);
      // }
      // if (response.description && typeof response.description.text === 'string') {
      //   motdparser.toHtml(response.description.text, (err: any, htmlResult: string) => {
      //     if (!err && htmlResult) {
      //       response.description.html = htmlResult;
      //     }
      //   });
      // }
      return response;
    } catch (error) {
      // console.error(`Error pinging ${ip}:${port}:`, error);
      return {
        error: "Seems to be offline right now.",
      };
    }
  };

  const vanillaIp = process.env.NEXT_PUBLIC_MCIP as string;
  const moddedIp = process.env.NEXT_PUBLIC_MCMODDEDIP as string;

  // Standard Minecraft ports
  const vanillaPort = 25565;
  const moddedPort = 25577; // Assuming a different port for modded

  const vanillaData = await getServerData(vanillaIp, vanillaPort);
  const moddedData = await getServerData(moddedIp, moddedPort);

  res.status(200).json({ vanilla: vanillaData, modded: moddedData });
}
