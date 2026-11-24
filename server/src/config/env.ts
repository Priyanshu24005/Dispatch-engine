import "dotenv/config";

export const env = {
  port: Number(process.env.PORT ?? 3000),
  redisHost: process.env.REDIS_HOST ?? "localhost",
  redisPort: Number(process.env.REDIS_PORT ?? 6379),
  mongoUri: process.env.MONGO_URI ?? "mongodb://localhost:27017/dispatch_engine",
    staleAfterMs: Number(process.env.STALE_AFTER_MS ?? 30000),
  sweepIntervalMs: Number(process.env.SWEEP_INTERVAL_MS ?? 5000),
};