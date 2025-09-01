import { Request, Response } from "express";

export default function authHandler(req: Request, res: Response) {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  res.json({ success: true, user: { username } });
}
