import psycopg2

DB_URL = "postgresql://neondb_owner:npg_8kLOmcsin2EH@ep-fragrant-darkness-aonoimt5.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"

conn = psycopg2.connect(DB_URL)
cur = conn.cursor()

print("=== Database Record Counts ===")
for label, table in [
    ("Countries",     "Country"),
    ("States",        "State"),
    ("Districts",     "District"),
    ("Sub-districts", "SubDistrict"),
    ("Villages",      "Village"),
]:
    cur.execute(f'SELECT COUNT(*) FROM "{table}"')
    print(f"{label:20}: {cur.fetchone()[0]:,}")

# Spot check
print("\n=== Spot Check — Sample Villages ===")
cur.execute("""
    SELECT v.name, sd.name, d.name, s.name
    FROM "Village" v
    JOIN "SubDistrict" sd ON v."subDistrictId" = sd.id
    JOIN "District" d ON sd."districtId" = d.id
    JOIN "State" s ON d."stateId" = s.id
    LIMIT 5;
""")
for row in cur.fetchall():
    print(f"  {row[0]} → {row[1]} → {row[2]} → {row[3]}")

# Orphan check
print("\n=== Orphan Check ===")
cur.execute('SELECT COUNT(*) FROM "Village" WHERE "subDistrictId" IS NULL')
print(f"Villages without sub-district: {cur.fetchone()[0]}")

cur.close()
conn.close()
print("\n✅ Verification complete!")