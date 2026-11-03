import express from "express";
import { redis } from "./config/redis.js";

export const app = express();

app.use(express.json());

app.get("/api/health", async (_req, res) => {
  const redisReply = await redis.ping();
  res.json({ status: "ok", redis: redisReply });
});