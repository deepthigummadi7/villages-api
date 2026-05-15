const express = require("express");
const router = express.Router();
const {
  generateKey,
  listKeys,
  revokeKey,
} = require("../controllers/apikey.controller");
const { verifyToken } = require("../middleware/auth.middleware");

router.post("/keys", verifyToken, generateKey);
router.get("/keys", verifyToken, listKeys);
router.delete("/keys/:id", verifyToken, revokeKey);

module.exports = router;
