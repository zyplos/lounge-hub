import type { NextApiRequest, NextApiResponse } from "next";

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
