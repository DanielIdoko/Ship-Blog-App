// Redis Helper functions

import redisClient from "../config/redis";

/**
 * @desc    Get value from cache or set it if not found
 * @param   {string} key - Unique cache key
 * @param   {function} fetchFunction - Function that returns fresh data
 * @param   {number} ttl - Time-to-live in seconds (default: 1 hour)
 * @returns {Promise<any>} Cached or fresh data
 */
export const getOrSetCache = async (key, fetchFunction, ttl = 3600) => {
  try {
    // Check if cached value exists
    const cachedData = await redisClient.get(key);

    if (cachedData) {
      console.log(`Cache hit: ${key}`);
      return JSON.parse(cachedData);
    }

    console.log(`Cache miss: ${key}`);
    const freshData = await fetchFunction();

    // Store fresh data in Redis
    await redisClient.setEx(key, ttl, JSON.stringify(freshData));

    return freshData;
  } catch (error) {
    console.error("Redis getOrSetCache error:", error.message);
    // If Redis fails, fallback to fetching fresh data
    return await fetchFunction();
  }
};

/**
 * Set a cache entry
 * @param {string} key - Cache key
 * @param {any} value - Value to store (auto-serialized)
 * @param {number} ttl - Time-to-live in seconds (default: 3600 = 1hr)
 */
export async function setCache(key, value, ttl = 3600) {
  try {
    const serialized = JSON.stringify(value);
    await redisClient.set(key, serialized, { EX: ttl });
  } catch (err) {
    console.error("Redis setCache error:", err);
  }
}

/**
 * Get a cache entry
 * @param {string} key - Cache key
 * @returns {any|null} Parsed value or null if not found
 */
export async function getCache(key) {
  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error("Redis getCache error:", err);
    return null;
  }
}

/**
 * Delete a cache entry
 * @param {string} key - Cache key
 */
export async function deleteCache(key) {
  try {
    await redisClient.del(key);
  } catch (err) {
    console.error("Redis deleteCache error:", err);
  }
}



/**
 * Clear all Redis keys ( Admin use only)
 */
export async function clearCache() {
  try {
    await redisClient.flushAll();
    console.log("Redis cache cleared.");
  } catch (err) {
    console.error("Redis clearCache error:", err);
  }
}

/**
 * List all Redis keys (for debugging/admin)
 */
export async function listKeys(pattern = "*") {
  try {
    return await redisClient.keys(pattern);
  } catch (err) {
    console.error("Redis listKeys error:", err);
    return [];
  }
}
