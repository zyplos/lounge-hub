import type { NextApiRequest, NextApiResponse } from "next";
import type { ApiError } from "@/internals/apiTypes";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiError>
) {
  return res
    .status(400)
    .json({ errorMessage: "Dimension UUID must be provided." });
}
