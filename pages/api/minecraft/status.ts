import type { NextApiRequest, NextApiResponse } from "next";
import mc from "minecraftstatuspinger";
import type {
  ApiError,
  MinecraftServerStatus,
  MinecraftStatusAPIResponse,
} from "@/internals/apiTypes";

// Helper type guard to check if the error is a Node.js system error
// Check if it's an object that has a 'code' property
function isNodeError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && "code" in error;
}

const getServerData = async (
  ip: string,
  port?: number
): Promise<MinecraftServerStatus | ApiError> => {
  try {
    const result = await mc.lookup({
      host: ip,
      port,
      ping: false,
      timeout: 10000,
      throwOnParseError: true,
      SRVLookup: true,
      JSONParse: true,
    });

    if (!result.status) {
      // this'll return the generic error message to the client which is fine
      throw new Error("package couldn't parse json response from server");
    }

    return result.status as MinecraftServerStatus;
  } catch (error) {
    if (
      isNodeError(error) &&
      (error.code === "ECONNREFUSED" || error.code === "ETIMEDOUT")
    ) {
      return {
        errorMessage:
          "This server is currently offline or its status is unavailable.",
      };
    }

    console.error(`unknown error for ${ip}`, error);
    return { errorMessage: "This server's status is unavailable." };
  }
};

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<MinecraftStatusAPIResponse>
) {
  const vanillaIp = process.env.NEXT_PUBLIC_MCIP as string;
  const moddedIp = process.env.NEXT_PUBLIC_MCMODDEDIP as string;

  const [vanilla, modded] = await Promise.all([
    getServerData(vanillaIp),
    getServerData(moddedIp),
  ]);

  res.status(200).json({ vanilla, modded });
}
