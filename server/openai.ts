import { Request, Response } from "express";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function openaiHandler(req: Request, res: Response) {
  try {
    const { prompt } = req.body;

    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ reply: response.choices[0].message?.content });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
