const pool = require("./config/db");

async function createTables() {
  try {
    console.log("Creating auth tables...");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS "User" (
        id              SERIAL PRIMARY KEY,
        email           VARCHAR(255) NOT NULL UNIQUE,
        password        VARCHAR(255) NOT NULL,
        "businessName"  VARCHAR(255) NOT NULL,
        phone           VARCHAR(20),
        "planType"      VARCHAR(20) NOT NULL DEFAULT 'Free',
        status          VARCHAR(20) NOT NULL DEFAULT 'PENDING',
        role            VARCHAR(20) NOT NULL DEFAULT 'USER',
        "createdAt"     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt"     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ User table created");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS "ApiKey" (
        id              SERIAL PRIMARY KEY,
        "userId"        INTEGER NOT NULL REFERENCES "User"(id),
        name            VARCHAR(100) NOT NULL,
        key             VARCHAR(100) NOT NULL UNIQUE,
        "secretHash"    VARCHAR(255) NOT NULL,
        status          VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
        "lastUsedAt"    TIMESTAMP,
        "createdAt"     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ ApiKey table created");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS "ApiLog" (
        id              SERIAL PRIMARY KEY,
        "userId"        INTEGER REFERENCES "User"(id),
        "apiKeyId"      INTEGER REFERENCES "ApiKey"(id),
        endpoint        VARCHAR(255) NOT NULL,
        method          VARCHAR(10) NOT NULL,
        "statusCode"    INTEGER NOT NULL,
        "responseTime"  INTEGER NOT NULL,
        "ipAddress"     VARCHAR(50),
        "createdAt"     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ ApiLog table created");

    console.log("\n✅ All auth tables created successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
}

createTables();
