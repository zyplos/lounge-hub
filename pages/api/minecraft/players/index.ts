import type { NextApiRequest, NextApiResponse } from "next";
import type { ApiError } from "@/internals/apiTypes";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiError>
) {
  return res
    .status(400)
    .json({ errorMessage: "Player name or UUID must be provided." });
}
