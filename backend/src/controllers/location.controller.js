const pool = require("../config/db");
const { randomUUID } = require("crypto");

// GET /api/v1/states
const getStates = async (req, res) => {
  const start = Date.now();
  try {
    const result = await pool.query(
      'SELECT id, name, code FROM "State" ORDER BY name',
    );
    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows,
      meta: {
        requestId: randomUUID(),
        responseTime: Date.now() - start,
        rateLimit: req.rateLimit || null,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET /api/v1/districts?stateId=1
const getDistricts = async (req, res) => {
  const start = Date.now();
  const { stateId } = req.query;
  if (!stateId) {
    return res
      .status(400)
      .json({ success: false, error: "stateId is required" });
  }
  try {
    const result = await pool.query(
      'SELECT id, name, code FROM "District" WHERE "stateId" = $1 ORDER BY name',
      [stateId],
    );
    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows,
      meta: {
        requestId: randomUUID(),
        responseTime: Date.now() - start,
        rateLimit: req.rateLimit || null,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET /api/v1/subdistricts?districtId=1
const getSubDistricts = async (req, res) => {
  const start = Date.now();
  const { districtId } = req.query;
  if (!districtId) {
    return res
      .status(400)
      .json({ success: false, error: "districtId is required" });
  }
  try {
    const result = await pool.query(
      'SELECT id, name, code FROM "SubDistrict" WHERE "districtId" = $1 ORDER BY name',
      [districtId],
    );
    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows,
      meta: {
        requestId: randomUUID(),
        responseTime: Date.now() - start,
        rateLimit: req.rateLimit || null,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET /api/v1/villages?subDistrictId=1
const getVillages = async (req, res) => {
  const start = Date.now();
  const { subDistrictId } = req.query;
  if (!subDistrictId) {
    return res
      .status(400)
      .json({ success: false, error: "subDistrictId is required" });
  }
  try {
    const result = await pool.query(
      'SELECT id, name, code FROM "Village" WHERE "subDistrictId" = $1 ORDER BY name',
      [subDistrictId],
    );
    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows,
      meta: {
        requestId: randomUUID(),
        responseTime: Date.now() - start,
        rateLimit: req.rateLimit || null,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET /api/v1/search?q=manibeli
const search = async (req, res) => {
  const start = Date.now();
  const { q } = req.query;
  if (!q || q.length < 2) {
    return res
      .status(400)
      .json({ success: false, error: "Query must be at least 2 characters" });
  }
  try {
    const result = await pool.query(
      `SELECT v.id, v.name AS village, sd.name AS subdistrict,
              d.name AS district, s.name AS state
       FROM "Village" v
       JOIN "SubDistrict" sd ON v."subDistrictId" = sd.id
       JOIN "District" d ON sd."districtId" = d.id
       JOIN "State" s ON d."stateId" = s.id
       WHERE v.name ILIKE $1
       LIMIT 20`,
      [`%${q}%`],
    );
    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows,
      meta: {
        requestId: randomUUID(),
        responseTime: Date.now() - start,
        rateLimit: req.rateLimit || null,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  getStates,
  getDistricts,
  getSubDistricts,
  getVillages,
  search,
};
