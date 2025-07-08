import type { NextApiRequest, NextApiResponse } from "next";

export function generate405Response(req: NextApiRequest, res: NextApiResponse) {
  return res.status(405).json({
    errorMessage: `you can't make a ${req.method} request to this route`,
  });
}
