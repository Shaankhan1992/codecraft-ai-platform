import { Router } from "express";
import openaiHandler from "./openai";
import authHandler from "./replitAuth";

const router = Router();

router.get("/", (req, res) => {
  res.send("CodeCraft AI Platform API is running ✅");
});

// Example routes
router.post("/openai", openaiHandler);
router.post("/auth", authHandler);

export default router;
