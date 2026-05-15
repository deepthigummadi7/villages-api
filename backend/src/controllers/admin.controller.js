const db = require("../config/db");

exports.getUsers = async (req, res) => {
  try {
    const { rows } = await db.query(
      `SELECT id, email, "businessName", "planType", status, "createdAt"
       FROM "User" ORDER BY "createdAt" DESC`,
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body;
    const status = action === "suspend" ? "SUSPENDED" : "ACTIVE";
    await db.query(`UPDATE "User" SET status = $1 WHERE id = $2`, [status, id]);
    res.json({ success: true, message: `User ${action}d successfully` });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getLogs = async (req, res) => {
  try {
    const { rows } = await db.query(
      `SELECT l.*, k.key as "apiKey"
       FROM "ApiLog" l
       LEFT JOIN "ApiKey" k ON l."apiKeyId" = k.id
       ORDER BY l."createdAt" DESC
       LIMIT 100`,
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
