const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const locationRoutes = require("./src/routes/location.routes");
const authRoutes = require("./src/routes/auth.routes");
const apikeyRoutes = require("./src/routes/apikey.routes");
const adminRoutes = require("./src/routes/admin.routes");
const { validateApiKey } = require("./src/middleware/ratelimit.middleware");

// Public auth routes
app.use("/api/auth", authRoutes);

// B2B portal routes (JWT protected)
app.use("/api/b2b", apikeyRoutes);

// Admin routes (JWT + admin protected)
app.use("/api/admin", adminRoutes);

// Location routes (API key protected)
app.use("/api/v1", validateApiKey, locationRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Villages API is running!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
