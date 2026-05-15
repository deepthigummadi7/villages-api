const express = require("express");
const router = express.Router();
const {
  getStates,
  getDistricts,
  getSubDistricts,
  getVillages,
  search,
} = require("../controllers/location.controller");

router.get("/states", getStates);
router.get("/districts", getDistricts);
router.get("/subdistricts", getSubDistricts);
router.get("/villages", getVillages);
router.get("/search", search);

module.exports = router;
