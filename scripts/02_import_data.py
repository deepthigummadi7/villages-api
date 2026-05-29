import psycopg2
import pandas as pd

DB_URL = "postgresql://neondb_owner:npg_8kLOmcsin2EH@ep-fragrant-darkness-aonoimt5.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"

print("Connecting to NeonDB...")
conn = psycopg2.connect(DB_URL)
cur = conn.cursor()

print("Loading cleaned_villages.csv...")
df = pd.read_csv("cleaned_villages.csv", dtype=str)
df = df.fillna("")

# ── Country ────────────────────────────────────────
cur.execute("""
    INSERT INTO "Country" (name, code)
    VALUES ('India', 'IN')
    ON CONFLICT (code) DO NOTHING
    RETURNING id;
""")
row = cur.fetchone()
if row:
    country_id = row[0]
else:
    cur.execute('SELECT id FROM "Country" WHERE code = %s', ('IN',))
    country_id = cur.fetchone()[0]
conn.commit()
print(f"✅ Country ID: {country_id}")

# ── States ─────────────────────────────────────────
states = df[["MDDS STC", "STATE NAME"]].drop_duplicates()
state_map = {}
for _, r in states.iterrows():
    cur.execute("""
        INSERT INTO "State" (code, name, "countryId")
        VALUES (%s, %s, %s)
        ON CONFLICT (code) DO UPDATE SET name = EXCLUDED.name
        RETURNING id, code;
    """, (r["MDDS STC"], r["STATE NAME"], country_id))
    sid, scode = cur.fetchone()
    state_map[scode] = sid
conn.commit()
print(f"✅ States imported: {len(state_map)}")

# ── Districts ──────────────────────────────────────
districts = df[["MDDS DTC", "DISTRICT NAME", "MDDS STC"]].drop_duplicates()
district_map = {}
for _, r in districts.iterrows():
    if r["MDDS STC"] not in state_map:
        continue
    cur.execute("""
        INSERT INTO "District" (code, name, "stateId")
        VALUES (%s, %s, %s)
        ON CONFLICT (code) DO UPDATE SET name = EXCLUDED.name
        RETURNING id, code;
    """, (r["MDDS DTC"], r["DISTRICT NAME"], state_map[r["MDDS STC"]]))
    did, dcode = cur.fetchone()
    district_map[dcode] = did
conn.commit()
print(f"✅ Districts imported: {len(district_map)}")

# ── Sub-Districts ──────────────────────────────────
subdists = df[["MDDS Sub_DT", "SUB-DISTRICT NAME", "MDDS DTC"]].drop_duplicates()
subdist_map = {}
for _, r in subdists.iterrows():
    if r["MDDS DTC"] not in district_map:
        continue
    cur.execute("""
        INSERT INTO "SubDistrict" (code, name, "districtId")
        VALUES (%s, %s, %s)
        ON CONFLICT (code) DO UPDATE SET name = EXCLUDED.name
        RETURNING id, code;
    """, (r["MDDS Sub_DT"], r["SUB-DISTRICT NAME"], district_map[r["MDDS DTC"]]))
    sid, scode = cur.fetchone()
    subdist_map[scode] = sid
conn.commit()
print(f"✅ Sub-districts imported: {len(subdist_map)}")

from psycopg2.extras import execute_values

# ── Villages — FAST batch insert ──────────────────
villages = df[["MDDS PLCN", "Area Name", "MDDS Sub_DT"]].drop_duplicates("MDDS PLCN")
total = len(villages)
BATCH = 10000
inserted = 0

for i in range(0, total, BATCH):
    chunk = villages.iloc[i:i+BATCH]
    records = [
        (r["MDDS PLCN"], r["Area Name"], subdist_map[r["MDDS Sub_DT"]])
        for _, r in chunk.iterrows()
        if r["MDDS Sub_DT"] in subdist_map
    ]
    if records:
        execute_values(cur, """
            INSERT INTO "Village" (code, name, "subDistrictId")
            VALUES %s
            ON CONFLICT (code) DO NOTHING;
        """, records)
        conn.commit()
    inserted += len(records)
    print(f"Villages: {inserted}/{total}")

cur.close()
conn.close()
print("\n✅ Import complete!")
