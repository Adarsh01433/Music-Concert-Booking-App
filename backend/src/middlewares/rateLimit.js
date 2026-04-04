const rateLimit = require("express-rate-limit");

const globalRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many Requests"
});

const authLimiter = rateLimit({
    windowMs: 60 * 1000, // ✅ FIXED
    max: 5,
    message: "Too many login attempts, try again later"
});

module.exports = { globalRateLimiter, authLimiter };