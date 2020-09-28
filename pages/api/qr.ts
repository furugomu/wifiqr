import { NextApiRequest, NextApiResponse } from "next";
import QRCode from "qrcode";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const value = String(req.query.v);
  try {
    const s = await QRCode.toString(value, { type: "svg" });
    res.setHeader("content-type", "image/svg+xml");
    res.setHeader("cache-control", "max-age=3600");
    res.status(200).end(s);
  } catch (e) {
    console.error(e);
    res.status(500).json("internal server error");
  }
};
