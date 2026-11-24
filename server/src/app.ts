import express from "express";
import mongoose from "mongoose";
import { redis } from "./config/redis.js";
import requestRoutes from "./routes/request.routes.js";

export const app = express();

app.use(express.json());
app.use("/api/requests", requestRoutes);

app.get("/api/health", async (_req, res) => {
  const redisReply = await redis.ping();
  const mongoState = mongoose.connection.readyState === 1 ? "connected" : "down";
  res.json({ status: "ok", redis: redisReply, mongo: mongoState });
});