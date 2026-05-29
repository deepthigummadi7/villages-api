import psycopg2
from dotenv import load_dotenv
import os

load_dotenv(r"C:\Users\user\Desktop\capstone\.env")
DB_URL = os.getenv("DATABASE_URL")

print("Connecting to NeonDB...")
conn = psycopg2.connect(DB_URL)
cur = conn.cursor()

print("Creating tables...")

cur.execute("""
    CREATE TABLE IF NOT EXISTS "Country" (
        id      SERIAL PRIMARY KEY,
        name    VARCHAR(100) NOT NULL,
        code    VARCHAR(10)  NOT NULL UNIQUE
    );
""")

cur.execute("""
    CREATE TABLE IF NOT EXISTS "State" (
        id          SERIAL PRIMARY KEY,
        code        VARCHAR(20)  NOT NULL UNIQUE,
        name        VARCHAR(100) NOT NULL,
        "countryId" INTEGER NOT NULL REFERENCES "Country"(id)
    );
""")

cur.execute("""
    CREATE TABLE IF NOT EXISTS "District" (
        id        SERIAL PRIMARY KEY,
        code      VARCHAR(20)  NOT NULL UNIQUE,
        name      VARCHAR(100) NOT NULL,
        "stateId" INTEGER NOT NULL REFERENCES "State"(id)
    );
""")

cur.execute("""
    CREATE TABLE IF NOT EXISTS "SubDistrict" (
        id           SERIAL PRIMARY KEY,
        code         VARCHAR(20)  NOT NULL UNIQUE,
        name         VARCHAR(100) NOT NULL,
        "districtId" INTEGER NOT NULL REFERENCES "District"(id)
    );
""")

cur.execute("""
    CREATE TABLE IF NOT EXISTS "Village" (
        id              SERIAL PRIMARY KEY,
        code            VARCHAR(20)  NOT NULL UNIQUE,
        name            VARCHAR(100) NOT NULL,
        "subDistrictId" INTEGER NOT NULL REFERENCES "SubDistrict"(id)
    );
""")

conn.commit()
print("✅ All tables created successfully!")

cur.close()
conn.close()