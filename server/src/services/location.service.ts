import { redis } from "../config/redis.js";

export const LIVE_KEY = "riders:live";
export const LASTSEEN_KEY = "riders:lastseen";

export const saveLocation = async (riderId: string, lat: number, lng: number) => {
  await redis
    .pipeline()
    .geoadd(LIVE_KEY, lng, lat, riderId)
    .zadd(LASTSEEN_KEY, Date.now(), riderId)
    .exec();
};