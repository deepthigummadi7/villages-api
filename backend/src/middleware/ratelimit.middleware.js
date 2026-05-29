const redis = require("../config/redis");
const pool = require("../config/db");

const PLAN_LIMITS = {
  Free: 5000,
  Premium: 50000,
  Pro: 300000,
  Unlimited: 1000000,
};

const validateApiKey = async (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(401).json({
      success: false,
      error: "API key required. Pass X-API-Key header.",
    });
  }

  try {
    const keyResult = await pool.query(
      `SELECT ak.*, u.id as "userId", u."planType", u.status as "userStatus"
       FROM "ApiKey" ak
       JOIN "User" u ON ak."userId" = u.id
       WHERE ak.key = $1`,
      [apiKey],
    );

    if (keyResult.rows.length === 0) {
      return res.status(401).json({
        success: false,
        error: "Invalid API key",
      });
    }

    const keyData = keyResult.rows[0];

    if (keyData.status !== "ACTIVE") {
      return res.status(401).json({
        success: false,
        error: "API key is revoked or inactive",
      });
    }

    if (keyData.userStatus !== "ACTIVE") {
      return res.status(403).json({
        success: false,
        error: "Account is not active",
      });
    }

    const today = new Date().toISOString().split("T")[0];
    const redisKey = `ratelimit:${apiKey}:${today}`;
    const limit = PLAN_LIMITS[keyData.planType] || PLAN_LIMITS.Free;

    const current = await redis.incr(redisKey);

    if (current === 1) {
      await redis.expire(redisKey, 86400);
    }

    if (current > limit) {
      return res.status(429).json({
        success: false,
        error: "Daily rate limit exceeded",
        meta: {
          limit,
          used: current,
          remaining: 0,
          reset: `${today}T23:59:59Z`,
        },
      });
    }

    req.apiKey = keyData;
    req.rateLimit = {
      limit,
      used: current,
      remaining: limit - current,
    };

    pool.query('UPDATE "ApiKey" SET "lastUsedAt" = NOW() WHERE key = $1', [
      apiKey,
    ]);

    next();
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { validateApiKey };
