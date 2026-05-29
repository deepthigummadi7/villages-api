import psycopg2

DB_URL = "postgresql://neondb_owner:npg_8kLOmcsin2EH@ep-fragrant-darkness-aonoimt5.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"

conn = psycopg2.connect(DB_URL)
cur = conn.cursor()
cur.execute('DELETE FROM "Village"')
conn.commit()
print("✅ Villages cleared")
conn.close()