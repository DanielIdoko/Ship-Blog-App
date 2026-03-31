import { createClient } from "redis";
import { config } from "../config/env";

export const redisClient = createClient({
  username: "default",
  password: config.REDIS_PASSWORD,
  socket: {
    host: config.REDIS_HOST,
    port: 19884,
  },
});

// Connection setup
redisClient.on("connect", () => {
  console.log("Redis connecting...");
});

redisClient.on("ready", () => {
  console.log("Redis connected and ready to use.");
});

redisClient.on("error", (err) => {
  console.error("Redis connection error:", err);
});

redisClient.on("end", () => {
  console.log("Redis connection closed.");
});

// Connect automatically on startup
(async () => {
  try {
    if (!redisClient.isOpen) await redisClient.connect();
  } catch (err) {
    console.error("Redis connection failed:", err);
  }
})();


// Graceful Shutdown
process.on("SIGINT", async () => {
  await redisClient.quit();
  console.log("Redis client disconnected via app termination.");
  process.exit(0);
});

export default redisClient;
