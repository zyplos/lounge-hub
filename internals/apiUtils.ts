import type { NextApiRequest, NextApiResponse } from "next";
import type { ApiError } from "./apiTypes";

export function generate405Response(req: NextApiRequest, res: NextApiResponse) {
  return res.status(405).json({
    errorMessage: `you can't make a ${req.method} request to this route`,
  });
}

export const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isStringUUID(str: string) {
  return UUID_REGEX.test(str);
}

// returns null if okay otherwise returns ApiError
export function validateChunkArguments(
  req: NextApiRequest
): ApiError | [string, number, number] {
  const { dimension: queryDimension, x: queryX, z: queryZ } = req.query;

  if (
    !queryX ||
    !queryZ ||
    !queryDimension ||
    typeof queryX !== "string" ||
    typeof queryZ !== "string" ||
    typeof queryDimension !== "string"
  ) {
    return { errorMessage: "Chunk X, Z, and dimension must be specified." };
  }

  const x = Number.parseInt(queryX, 10);
  const z = Number.parseInt(queryZ, 10);

  if (Number.isNaN(x) || Number.isNaN(z)) {
    return { errorMessage: "Chunk X and Z must be valid numbers." };
  }

  return [queryDimension, x, z];
}
