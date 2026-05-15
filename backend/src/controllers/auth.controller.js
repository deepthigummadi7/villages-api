const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// POST /api/auth/register
const register = async (req, res) => {
  const { email, password, businessName, phone } = req.body;

  if (!email || !password || !businessName) {
    return res.status(400).json({
      success: false,
      error: "Email, password and business name are required",
    });
  }

  try {
    const existing = await pool.query(
      'SELECT id FROM "User" WHERE email = $1',
      [email],
    );
    if (existing.rows.length > 0) {
      return res.status(400).json({
        success: false,
        error: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO "User" (email, password, "businessName", phone, status, role)
       VALUES ($1, $2, $3, $4, 'PENDING', 'USER')
       RETURNING id, email, "businessName", status`,
      [email, hashedPassword, businessName, phone],
    );

    res.status(201).json({
      success: true,
      message: "Registration successful. Awaiting admin approval.",
      data: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// POST /api/auth/login
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: "Email and password are required",
    });
  }

  try {
    const result = await pool.query('SELECT * FROM "User" WHERE email = $1', [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
    }

    const user = result.rows[0];

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
    }

    if (user.status === "PENDING") {
      return res.status(403).json({
        success: false,
        error: "Account pending admin approval",
      });
    }

    if (user.status === "SUSPENDED") {
      return res.status(403).json({
        success: false,
        error: "Account suspended. Contact support.",
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    res.json({
      success: true,
      token,
      data: {
        id: user.id,
        email: user.email,
        businessName: user.businessName,
        role: user.role,
        planType: user.planType,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// POST /api/auth/create-admin
const createAdmin = async (req, res) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    const existing = await pool.query(
      'SELECT id FROM "User" WHERE email = $1',
      [adminEmail],
    );
    if (existing.rows.length > 0) {
      return res.json({ success: true, message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await pool.query(
      `INSERT INTO "User" (email, password, "businessName", status, role)
       VALUES ($1, $2, 'Admin', 'ACTIVE', 'ADMIN')`,
      [adminEmail, hashedPassword],
    );

    res.json({ success: true, message: "✅ Admin account created" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { register, login, createAdmin };
