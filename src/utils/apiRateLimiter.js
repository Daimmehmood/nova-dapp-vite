// src/utils/apiRateLimiter.js
class ApiRateLimiter {
  constructor(maxRequests = 10, timeWindow = 60000) {
    this.requestTimestamps = {};
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindow; // in milliseconds
  }

  async throttleRequest(apiName, apiCallFn) {
    if (!this.requestTimestamps[apiName]) {
      this.requestTimestamps[apiName] = [];
    }

    // Clean old timestamps
    const now = Date.now();
    this.requestTimestamps[apiName] = this.requestTimestamps[apiName].filter(
      timestamp => now - timestamp < this.timeWindow
    );

    // Check if we're over the limit
    if (this.requestTimestamps[apiName].length >= this.maxRequests) {
      const oldestRequest = this.requestTimestamps[apiName][0];
      const timeToWait = this.timeWindow - (now - oldestRequest);
      
      console.log(`Rate limit reached for ${apiName}. Waiting ${timeToWait}ms...`);
      await new Promise(resolve => setTimeout(resolve, timeToWait));
    }

    // Add current timestamp and execute the request
    this.requestTimestamps[apiName].push(Date.now());
    return apiCallFn();
  }
}

// Export singleton instance
export const apiRateLimiter = new ApiRateLimiter();

// Usage example:
// Instead of: const data = await fetchSomeApi();
// Use: const data = await apiRateLimiter.throttleRequest('coinGecko', () => fetchSomeApi());