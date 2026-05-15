import psycopg2

DB_URL = "postgresql://neondb_owner:npg_8kLOmcsin2EH@ep-fragrant-darkness-aonoimt5.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"

conn = psycopg2.connect(DB_URL)
cur = conn.cursor()

print("Creating auth tables...")

# User table
cur.execute("""
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
""")

# ApiKey table
cur.execute("""
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
""")

# ApiLog table
cur.execute("""
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
""")

conn.commit()
print("✅ User table created")
print("✅ ApiKey table created")
print("✅ ApiLog table created")

cur.close()
conn.close()