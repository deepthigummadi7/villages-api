const pool = require("../config/db");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

// POST /api/b2b/keys — Generate new API key
const generateKey = async (req, res) => {
  const { name } = req.body;
  const userId = req.user.id;

  if (!name) {
    return res.status(400).json({
      success: false,
      error: "Key name is required",
    });
  }

  try {
    // Check max 5 keys per user
    const count = await pool.query(
      'SELECT COUNT(*) FROM "ApiKey" WHERE "userId" = $1 AND status = $2',
      [userId, "ACTIVE"],
    );
    if (parseInt(count.rows[0].count) >= 5) {
      return res.status(400).json({
        success: false,
        error: "Maximum 5 active API keys allowed",
      });
    }

    // Generate key and secret
    const apiKey = "ak_" + crypto.randomBytes(16).toString("hex");
    const apiSecret = "as_" + crypto.randomBytes(16).toString("hex");

    // Hash the secret
    const secretHash = await bcrypt.hash(apiSecret, 10);

    // Save to database
    const result = await pool.query(
      `INSERT INTO "ApiKey" ("userId", name, key, "secretHash", status)
       VALUES ($1, $2, $3, $4, 'ACTIVE')
       RETURNING id, name, key, "createdAt"`,
      [userId, name, apiKey, secretHash],
    );

    res.status(201).json({
      success: true,
      message:
        "API key created. Save your secret — it will not be shown again!",
      data: {
        id: result.rows[0].id,
        name: result.rows[0].name,
        key: result.rows[0].key,
        secret: apiSecret,
        createdAt: result.rows[0].createdAt,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET /api/b2b/keys — List all keys for user
const listKeys = async (req, res) => {
  const userId = req.user.id;
  try {
    const result = await pool.query(
      `SELECT id, name, key, status, "lastUsedAt", "createdAt"
       FROM "ApiKey"
       WHERE "userId" = $1
       ORDER BY "createdAt" DESC`,
      [userId],
    );

    // Mask the key for display
    const keys = result.rows.map((k) => ({
      ...k,
      key: k.key.substring(0, 6) + "****" + k.key.substring(k.key.length - 4),
    }));

    res.json({ success: true, data: keys });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// DELETE /api/b2b/keys/:id — Revoke a key
const revokeKey = async (req, res) => {
  const userId = req.user.id;
  const keyId = req.params.id;

  try {
    const result = await pool.query(
      `UPDATE "ApiKey" SET status = 'REVOKED'
       WHERE id = $1 AND "userId" = $2
       RETURNING id`,
      [keyId, userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "API key not found",
      });
    }

    res.json({ success: true, message: "API key revoked successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { generateKey, listKeys, revokeKey };
