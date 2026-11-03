import { redis } from "./config/redis.js";

await redis.geoadd(
  "riders:live",
  78.0322, 30.324, "rider1",
  78.04, 30.33, "rider2",
  78.035, 30.327, "rider3",
);

const nearby = await redis.geosearch(
  "riders:live",
  "FROMLONLAT", 78.033, 30.325,
  "BYRADIUS", 3, "km",
  "ASC",
  "WITHDIST",
);
console.log(nearby);

await redis.del("riders:live");
redis.disconnect();