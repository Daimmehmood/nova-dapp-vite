// src/utils/apiCache.js
class ApiCache {
  constructor(defaultTTL = 5 * 60 * 1000) { // 5 minutes default TTL
    this.cache = {};
    this.defaultTTL = defaultTTL;
  }

  // Get cache item
  get(key) {
    const item = this.cache[key];
    if (!item) return null;
    
    // Check if item is expired
    if (Date.now() > item.expiry) {
      delete this.cache[key];
      return null;
    }
    
    return item.data;
  }

  // Set cache item with optional custom TTL
  set(key, data, ttl = this.defaultTTL) {
    this.cache[key] = {
      data,
      expiry: Date.now() + ttl
    };
  }

  // Clear a specific cache item
  clear(key) {
    delete this.cache[key];
  }

  // Clear all cache
  clearAll() {
    this.cache = {};
  }

  // Get cache size
  size() {
    return Object.keys(this.cache).length;
  }
}

// Create different cache instances with appropriate TTLs for different data types
export const tokenDataCache = new ApiCache(10 * 60 * 1000); // 10 minutes for token data
export const marketDataCache = new ApiCache(2 * 60 * 1000); // 2 minutes for market data
export const searchResultsCache = new ApiCache(15 * 60 * 1000); // 15 minutes for search results