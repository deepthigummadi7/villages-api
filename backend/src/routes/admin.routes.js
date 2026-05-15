const express = require("express");
const router = express.Router();
const {
  getUsers,
  updateUser,
  getLogs,
} = require("../controllers/admin.controller");
const { verifyToken, verifyAdmin } = require("../middleware/auth.middleware");

router.get("/users", verifyToken, verifyAdmin, getUsers);
router.patch("/users/:id", verifyToken, verifyAdmin, updateUser);
router.get("/logs", verifyToken, verifyAdmin, getLogs);

module.exports = router;
