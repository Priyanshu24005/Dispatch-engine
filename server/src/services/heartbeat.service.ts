import { env } from "../config/env.js";
import { redis } from "../config/redis.js";
import { LIVE_KEY, LASTSEEN_KEY } from "./location.service.js";

export const removeStaleRiders = async (): Promise<string[]> => {
  const cutoff = Date.now() - env.staleAfterMs;
  const staleIds = await redis.zrangebyscore(LASTSEEN_KEY, "-inf", cutoff);
  if (staleIds.length === 0) return [];

  await redis
    .pipeline()
    .zrem(LIVE_KEY, ...staleIds)
    .zrem(LASTSEEN_KEY, ...staleIds)
    .exec();

  return staleIds;
};

export const startHeartbeatSweeper = () =>
  setInterval(async () => {
    try {
      const removed = await removeStaleRiders();
      if (removed.length > 0) {
        console.log(`Removed stale riders: ${removed.join(", ")}`);
      }
    } catch (error) {
      console.error("Heartbeat sweep failed", error);
    }
  }, env.sweepIntervalMs);