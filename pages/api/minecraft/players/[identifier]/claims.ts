import type { NextApiRequest, NextApiResponse } from "next";
import { generate405Response } from "@/internals/apiUtils";

type Data = {
    message: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { identifier } = req.query;

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return generate405Response(req, res);
  }

  res.status(200).json({ message: `hey ${identifier} we'll implement the database stuff for this route later` });
}