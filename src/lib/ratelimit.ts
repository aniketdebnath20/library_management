import { Ratelimit } from "@upstash/ratelimit";
import redis from "@/src/database/redis";

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(6, "1m"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});

export default ratelimit;